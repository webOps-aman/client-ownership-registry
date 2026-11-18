/** disputeService.js - Commission disputes (admin only). Resolving can transfer ownership. */
import { storage } from "./storage";
import { logService } from "./logService";
import { clientService } from "./clientService";
import { AppError, requireAdmin, requireReason } from "./errors";
import { STORAGE_KEYS as K, AUDIT_ACTIONS as A, ROLES, DISPUTE_STATUS } from "@/config/constants";
import { uid, nowIso } from "@/utils/id";

const all = () => storage.get(K.disputes, []);

export const disputeService = {
  async list(user) {
    return user?.role === ROLES.ADMIN ? all() : [];
  },

  async create(admin, { clientId, claimedBy, note = "" }) {
    requireAdmin(admin);
    if (!clientId || !claimedBy) throw new AppError("VALIDATION", "Choose the client and the claimant.");
    const dispute = { id: uid("d"), clientId, claimedBy, note, status: DISPUTE_STATUS.OPEN, resolvedBy: null, reason: "", outcome: null, createdAt: nowIso(), resolvedAt: null };
    storage.set(K.disputes, [dispute, ...all()]);
    logService.audit(admin.id, A.DISPUTE_CREATED, "dispute", { disputeId: dispute.id, clientId, claimedBy });
    return dispute;
  },

  /** outcome: "keep" (current owner stays) or "transfer" (claimant becomes owner). */
  async resolve(admin, disputeId, { outcome, reason }) {
    requireAdmin(admin);
    requireReason(reason);
    const dispute = all().find((d) => d.id === disputeId);
    if (!dispute || dispute.status !== DISPUTE_STATUS.OPEN) throw new AppError("NOT_FOUND", "Open dispute not found.");
    if (outcome === "transfer") await clientService.transferOwnership(admin, dispute.clientId, dispute.claimedBy, reason);
    storage.set(K.disputes, all().map((d) => d.id === disputeId
      ? { ...d, status: DISPUTE_STATUS.RESOLVED, resolvedBy: admin.id, reason: reason.trim(), outcome, resolvedAt: nowIso() } : d));
    logService.audit(admin.id, A.DISPUTE_RESOLVED, "dispute", { disputeId, outcome, reason: reason.trim() });
  },
};
