/** seedService.js - Seeds demo data on first load, and resets it on request (admin Settings). */
import { storage } from "./storage";
import { logService } from "./logService";
import { requireAdmin } from "./errors";
import { STORAGE_KEYS as K, AUDIT_ACTIONS as A } from "@/config/constants";
import { buildSeedUsers } from "@/data/seedUsers";
import { buildSeedData } from "@/data/seedData";

function seed() {
  const users = buildSeedUsers();
  const d = buildSeedData(users);
  storage.set(K.users, users);
  storage.set(K.clients, d.clients);
  storage.set(K.attempts, d.attempts);
  storage.set(K.searches, d.searches);
  storage.set(K.audit, d.audit);
  storage.set(K.disputes, d.disputes);
  storage.set(K.meta, { seeded: true, nextSeq: d.nextSeq });
}

export const seedService = {
  /** Runs once: only seeds if nothing has been stored yet. */
  async ensureSeeded() {
    if (!storage.get(K.meta)?.seeded) seed();
  },
  /** Wipes all app data, reseeds, keeps the admin logged in. */
  async reset(admin) {
    requireAdmin(admin);
    const session = storage.get(K.session);
    storage.clearApp();
    if (session) storage.set(K.session, session);
    seed();
    logService.audit(admin.id, A.DEMO_RESET, "system");
  },
};
