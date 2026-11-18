/**
 * clientService.js - All client business rules live here (not in components):
 * phone uniqueness, first-registered-wins, rate-limited search, limited owner reveal,
 * admin edit/transfer with mandatory reason. Reads FRESH data from storage on every call.
 */
import { storage } from "./storage";
import { logService } from "./logService";
import { AppError, requireAdmin, requireReason } from "./errors";
import { STORAGE_KEYS as K, AUDIT_ACTIONS as A, ROLES, SOURCES, USER_STATUS } from "@/config/constants";
import { ENV } from "@/config/env";
import { normalizePhone } from "@/utils/phone";
import { nowIso } from "@/utils/id";

const clients = () => storage.get(K.clients, []);
const users = () => storage.get(K.users, []);
const MINUTE = 60_000;

/** The ONLY info other users may see about an existing owner (reveal rule). */
function ownerInfo(client, viewer) {
  const owner = users().find((u) => u.id === client.registeredBy);
  return {
    ownerName: owner?.name ?? "Unknown",
    ownerType: client.source === SOURCES.DIRECT ? "Company Direct" : "Broker",
    registeredOn: client.createdAt,
    isMine: client.registeredBy === viewer.id,
  };
}

export const clientService = {
  /** Admin: all clients. Agent/broker: only the ones they registered. */
  async list(user) {
    if (!user) return [];
    return user.role === ROLES.ADMIN ? clients() : clients().filter((c) => c.registeredBy === user.id);
  },

  /** Phone lookup. Returns a LIMITED result, never the full client record. */
  async check(user, rawPhone) {
    const phone = normalizePhone(rawPhone);
    if (!phone) throw new AppError("INVALID_PHONE", "Enter a valid 10-digit phone number.");

    if (user.role !== ROLES.ADMIN) {
      const recent = logService.recentSearches(user.id, MINUTE);
      if (recent.length >= ENV.searchLimitPerMin) {
        const oldest = new Date(recent[recent.length - 1].createdAt).getTime();
        const retryAfterSec = Math.max(1, Math.ceil((oldest + MINUTE - Date.now()) / 1000));
        logService.audit(user.id, A.SEARCH_RATE_LIMITED, "client", { phone });
        throw new AppError("RATE_LIMITED", `Too many searches. Please wait ${retryAfterSec} seconds.`, { retryAfterSec });
      }
    }

    const client = clients().find((c) => c.phoneNormalized === phone && c.status === "active");
    logService.search(phone, user.id, !!client);
    logService.audit(user.id, A.CLIENT_SEARCHED, "client", { phone, found: !!client });
    if (!client) return { found: false, phone };
    const info = ownerInfo(client, user);
    return { found: true, phone, ...info, clientId: info.isMine ? client.id : undefined };
  },

  /** Registers a client. Blocks + logs duplicates. Timestamp is generated here, never by the caller. */
  async register(user, form) {
    if (user.role === ROLES.ADMIN) throw new AppError("FORBIDDEN", "Admins manage records; agents and brokers register clients.");
    const fields = {};
    const phone = normalizePhone(form.phone);
    if (!form.name?.trim()) fields.name = "Client name is required.";
    if (!phone) fields.phone = "Enter a valid 10-digit phone number.";
    if (!form.visitDate) fields.visitDate = "Visit date is required.";
    if (!form.visitTime) fields.visitTime = "Visit time is required.";
    if (Object.keys(fields).length) throw new AppError("VALIDATION", "Please fix the highlighted fields.", { fields });

    const existing = clients().find((c) => c.phoneNormalized === phone && c.status === "active");
    if (existing) {
      logService.attempt(phone, user.id, existing.id);
      logService.audit(user.id, A.DUPLICATE_ATTEMPT, "client", { phone, existingClientId: existing.id });
      throw new AppError("DUPLICATE", "This client is already registered.", { owner: ownerInfo(existing, user) });
    }

    const meta = storage.get(K.meta, { seeded: true, nextSeq: 1 });
    const client = {
      id: `c_${meta.nextSeq}`,
      seq: meta.nextSeq,
      name: form.name.trim(),
      phoneNormalized: phone,
      registeredBy: user.id,
      source: user.role === ROLES.AGENT ? SOURCES.DIRECT : SOURCES.BROKER,
      visitDateTime: new Date(`${form.visitDate}T${form.visitTime}`).toISOString(),
      property: form.property?.trim() || "",
      notes: form.notes?.trim() || "",
      createdAt: nowIso(), // auto, not editable
      expiresAt: null, // reserved for future ownership expiry (not enforced)
      status: "active",
      history: [],
    };
    storage.set(K.clients, [client, ...clients()]);
    storage.set(K.meta, { ...meta, nextSeq: meta.nextSeq + 1 });
    logService.audit(user.id, A.CLIENT_REGISTERED, "client", { clientId: client.id, phone });
    return client;
  },

  /** Admin edit of non-ownership fields. Reason is mandatory; old/new values go to the audit log. */
  async update(admin, id, changes, reason) {
    requireAdmin(admin);
    requireReason(reason);
    const current = clients().find((c) => c.id === id);
    if (!current) throw new AppError("NOT_FOUND", "Client not found.");
    const allowed = ["name", "property", "notes", "visitDateTime"];
    const before = {}, after = {};
    allowed.forEach((f) => { if (f in changes && changes[f] !== current[f]) { before[f] = current[f]; after[f] = changes[f]; } });
    if (!Object.keys(after).length) throw new AppError("VALIDATION", "Nothing was changed.");
    const entry = { type: "edit", by: admin.id, reason: reason.trim(), at: nowIso(), before, after };
    storage.set(K.clients, clients().map((c) => (c.id === id ? { ...c, ...after, history: [...c.history, entry] } : c)));
    logService.audit(admin.id, A.CLIENT_EDITED, "client", { clientId: id, reason: entry.reason, before, after });
  },

  /** Admin override: moves ownership to another active agent/broker and keeps the previous owner in history. */
  async transferOwnership(admin, id, newOwnerId, reason) {
    requireAdmin(admin);
    requireReason(reason);
    const current = clients().find((c) => c.id === id);
    const newOwner = users().find((u) => u.id === newOwnerId && u.status === USER_STATUS.ACTIVE && u.role !== ROLES.ADMIN);
    if (!current) throw new AppError("NOT_FOUND", "Client not found.");
    if (!newOwner) throw new AppError("VALIDATION", "Choose an active agent or broker.");
    if (current.registeredBy === newOwnerId) throw new AppError("VALIDATION", "That user already owns this client.");
    const entry = { type: "transfer", fromUser: current.registeredBy, toUser: newOwnerId, by: admin.id, reason: reason.trim(), at: nowIso() };
    storage.set(K.clients, clients().map((c) => c.id === id
      ? { ...c, registeredBy: newOwnerId, source: newOwner.role === ROLES.AGENT ? SOURCES.DIRECT : SOURCES.BROKER, history: [...c.history, entry] }
      : c));
    logService.audit(admin.id, A.OWNERSHIP_TRANSFERRED, "client", { clientId: id, from: entry.fromUser, to: newOwnerId, reason: entry.reason });
  },
};
