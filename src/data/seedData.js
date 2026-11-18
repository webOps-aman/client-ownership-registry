/** seedData.js - Sample clients, logs and a dispute so every screen has content in the demo. */
import { ROLES, SOURCES, AUDIT_ACTIONS as A, DISPUTE_STATUS } from "@/config/constants";

const ago = (hours) => new Date(Date.now() - hours * 3600e3).toISOString();

const SAMPLE = [
  ["Rohan Mehta", "9876501001", "Greenfield Plots - Phase 2", "Interested in corner plots", 200],
  ["Ananya Iyer", "9876501002", "Skyline Heights 3BHK", "Wants a site visit on a weekend", 120],
  ["Vikram Singh", "9876501003", "Lakeview Villas", "", 70],
  ["Sneha Kapoor", "9876501004", "Orchid Residency", "Budget around 90 lakh", 30],
  ["Arjun Nair", "9876501005", "Sector 21 Commercial", "Looking for a ground-floor shop", 8],
  ["Pooja Desai", "9876501006", "Palm Meadows", "Referred by a family friend", 2],
];

export function buildSeedData(users) {
  const brokers = users.filter((u) => u.role === ROLES.BROKER);
  const agent = users.find((u) => u.role === ROLES.AGENT);
  const owners = [brokers[0], agent, brokers[1], brokers[2], brokers[0], agent].map((u, i) => u ?? brokers[i % brokers.length] ?? users[0]);

  const clients = SAMPLE.map(([name, phone, property, notes, hoursAgo], i) => ({
    id: `c_${i + 1}`,
    seq: i + 1,
    name,
    phoneNormalized: phone,
    registeredBy: owners[i].id,
    source: owners[i].role === ROLES.AGENT ? SOURCES.DIRECT : SOURCES.BROKER,
    visitDateTime: ago(hoursAgo - 5),
    property,
    notes,
    createdAt: ago(hoursAgo),
    expiresAt: null,
    status: "active",
    history: [],
  })).reverse(); // newest first, like real registrations

  const other = (c) => (users.find((u) => u.role !== ROLES.ADMIN && u.id !== c.registeredBy) ?? users[0]).id;
  const byId = Object.fromEntries(clients.map((c) => [c.id, c]));
  const attempts = [
    { id: "at_1", phone: "9876501002", attemptedBy: other(byId.c_2), existingClientId: "c_2", createdAt: ago(40) },
    { id: "at_2", phone: "9876501004", attemptedBy: other(byId.c_4), existingClientId: "c_4", createdAt: ago(5) },
  ];
  const searches = [
    { id: "se_1", phone: "9876501002", searchedBy: attempts[0].attemptedBy, found: true, createdAt: ago(41) },
    { id: "se_2", phone: "9123456780", searchedBy: owners[0].id, found: false, createdAt: ago(26) },
    { id: "se_3", phone: "9876501004", searchedBy: attempts[1].attemptedBy, found: true, createdAt: ago(5.1) },
  ];
  const audit = [
    ...clients.map((c) => ({ id: `au_c${c.seq}`, userId: c.registeredBy, action: A.CLIENT_REGISTERED, entity: "client", details: { clientId: c.id, phone: c.phoneNormalized }, createdAt: c.createdAt })),
    ...attempts.map((a) => ({ id: `au_${a.id}`, userId: a.attemptedBy, action: A.DUPLICATE_ATTEMPT, entity: "client", details: { phone: a.phone, existingClientId: a.existingClientId }, createdAt: a.createdAt })),
    ...searches.map((s) => ({ id: `au_${s.id}`, userId: s.searchedBy, action: A.CLIENT_SEARCHED, entity: "client", details: { phone: s.phone, found: s.found }, createdAt: s.createdAt })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const disputes = [
    { id: "d_1", clientId: "c_2", claimedBy: attempts[0].attemptedBy, note: "Says the client visited their office first.", status: DISPUTE_STATUS.OPEN, resolvedBy: null, reason: "", outcome: null, createdAt: ago(39), resolvedAt: null },
  ];
  return { clients, attempts, searches, audit, disputes, nextSeq: SAMPLE.length + 1 };
}
