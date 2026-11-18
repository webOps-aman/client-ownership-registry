/** selectors.js - Memoized (createSelector) read helpers. Parameterized ones are factories: one instance per component. */
import { createSelector } from "@reduxjs/toolkit";
import { isToday } from "@/utils/date";
import { DISPUTE_STATUS, USER_STATUS, ROLES } from "@/config/constants";

const byNewest = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
const clients = (s) => s.clients.items;
const users = (s) => s.users.items;
const attempts = (s) => s.logs.attempts;
const searches = (s) => s.logs.searches;
const audit = (s) => s.logs.audit;
const disputes = (s) => s.disputes.items;

export const selectCurrentUser = (s) => s.auth.user;
export const selectRole = (s) => s.auth.user?.role ?? null;
export const selectHydrated = (s) => s.auth.hydrated;

export const selectUsersById = createSelector([users], (u) => Object.fromEntries(u.map((x) => [x.id, x])));
export const selectBrokerOptions = createSelector([users], (u) =>
  u.filter((x) => x.role !== ROLES.ADMIN && x.status === USER_STATUS.ACTIVE).map((x) => ({ value: x.id, label: `${x.name} (${x.role})` })));

export const selectMyClients = createSelector([clients, selectCurrentUser], (c, u) =>
  c.filter((x) => x.registeredBy === u?.id).sort(byNewest));

export const selectMyStats = createSelector([selectMyClients, searches, attempts, selectCurrentUser], (mine, se, at, u) => ({
  registrations: mine.length,
  searchesToday: se.filter((x) => x.searchedBy === u?.id && isToday(x.createdAt)).length,
  duplicatesBlocked: at.filter((x) => x.attemptedBy === u?.id).length,
  lastRegistered: mine[0]?.createdAt ?? null,
}));

export const selectAdminStats = createSelector([clients, users, attempts, disputes], (c, u, a, d) => ({
  totalClients: c.length,
  activeBrokers: u.filter((x) => x.role === ROLES.BROKER && x.status === USER_STATUS.ACTIVE).length,
  duplicateAttempts: a.length,
  openDisputes: d.filter((x) => x.status === DISPUTE_STATUS.OPEN).length,
}));

/** useSelector(s => selectRecent(s, 5)) - create once per component with useMemo(makeSelectRecentRegistrations, []). */
export const makeSelectRecentRegistrations = () =>
  createSelector([clients, selectUsersById, (_, n) => n], (c, byId, n) =>
    [...c].sort(byNewest).slice(0, n).map((x) => ({ ...x, ownerName: byId[x.registeredBy]?.name ?? "Unknown" })));

export const makeSelectRecentActivity = () =>
  createSelector([audit, selectUsersById, (_, n) => n], (a, byId, n) =>
    [...a].sort(byNewest).slice(0, n).map((x) => ({ ...x, userName: byId[x.userId]?.name ?? "Unknown" })));

/** filters: { search, broker, source, from, to } (all optional; from/to are "YYYY-MM-DD"). */
export const makeSelectFilteredClients = () =>
  createSelector([clients, selectUsersById, (_, f) => f], (c, byId, f = {}) => {
    const q = (f.search || "").trim().toLowerCase();
    const from = f.from ? new Date(f.from).getTime() : null;
    const to = f.to ? new Date(f.to).getTime() + 86_400_000 : null;
    return c
      .filter((x) => !q || x.name.toLowerCase().includes(q) || x.phoneNormalized.includes(q.replace(/\D/g, "") || "\u0000"))
      .filter((x) => !f.broker || x.registeredBy === f.broker)
      .filter((x) => !f.source || x.source === f.source)
      .filter((x) => (from === null || new Date(x.createdAt) >= from) && (to === null || new Date(x.createdAt) < to))
      .sort(byNewest)
      .map((x) => ({ ...x, ownerName: byId[x.registeredBy]?.name ?? "Unknown" }));
  });

const named = (byId, id) => byId[id]?.name ?? "Unknown";
export const selectAttemptsWithDetails = createSelector([attempts, selectUsersById, clients], (a, byId, c) =>
  [...a].sort(byNewest).map((x) => {
    const client = c.find((y) => y.id === x.existingClientId);
    return { ...x, attemptedByName: named(byId, x.attemptedBy), ownerName: client ? named(byId, client.registeredBy) : "Unknown" };
  }));
export const selectSearchesWithDetails = createSelector([searches, selectUsersById], (s, byId) =>
  [...s].sort(byNewest).map((x) => ({ ...x, searchedByName: named(byId, x.searchedBy) })));
export const selectDisputesWithDetails = createSelector([disputes, selectUsersById, clients], (d, byId, c) =>
  [...d].sort(byNewest).map((x) => ({ ...x, claimedByName: named(byId, x.claimedBy), clientName: c.find((y) => y.id === x.clientId)?.name ?? "Unknown" })));

/** filters: { user, action, from, to } */
export const makeSelectFilteredAudit = () =>
  createSelector([audit, selectUsersById, (_, f) => f], (a, byId, f = {}) => {
    const from = f.from ? new Date(f.from).getTime() : null;
    const to = f.to ? new Date(f.to).getTime() + 86_400_000 : null;
    return a
      .filter((x) => (!f.user || x.userId === f.user) && (!f.action || x.action === f.action))
      .filter((x) => (from === null || new Date(x.createdAt) >= from) && (to === null || new Date(x.createdAt) < to))
      .sort(byNewest)
      .map((x) => ({ ...x, userName: named(byId, x.userId) }));
  });
