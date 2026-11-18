/**
 * env.js - The ONLY file that reads process.env.
 * Next.js inlines NEXT_PUBLIC_* values only when written literally,
 * so each variable is spelled out below. Demo-only credentials.
 */
const e = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME,
  COUNTRY_CODE: process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE,
  SEARCH_LIMIT: process.env.NEXT_PUBLIC_SEARCH_LIMIT_PER_MIN,
  SHOW_DEMO: process.env.NEXT_PUBLIC_SHOW_DEMO_CREDENTIALS,
  ADMIN: [process.env.NEXT_PUBLIC_ADMIN_ID, process.env.NEXT_PUBLIC_ADMIN_PASSWORD],
  AGENT: [process.env.NEXT_PUBLIC_AGENT_ID, process.env.NEXT_PUBLIC_AGENT_PASSWORD],
  B1: [process.env.NEXT_PUBLIC_BROKER1_ID, process.env.NEXT_PUBLIC_BROKER1_PASSWORD],
  B2: [process.env.NEXT_PUBLIC_BROKER2_ID, process.env.NEXT_PUBLIC_BROKER2_PASSWORD],
  B3: [process.env.NEXT_PUBLIC_BROKER3_ID, process.env.NEXT_PUBLIC_BROKER3_PASSWORD],
};

// Hardcoded demo users (seeded into the store on first load).
const demoUsers = [
  { name: "Admin", role: "admin", creds: e.ADMIN },
  { name: "Company Agent", role: "agent", creds: e.AGENT },
  { name: "Broker One", role: "broker", creds: e.B1 },
  { name: "Broker Two", role: "broker", creds: e.B2 },
  { name: "Broker Three", role: "broker", creds: e.B3 },
]
  .filter((u) => u.creds[0] && u.creds[1])
  .map(({ creds, ...u }) => ({ ...u, loginId: creds[0], password: creds[1] }));

export const ENV = {
  appName: e.APP_NAME || "Client Ownership Registry",
  companyName: e.COMPANY_NAME || "Emperium",
  defaultCountryCode: e.COUNTRY_CODE || "+91",
  searchLimitPerMin: Number(e.SEARCH_LIMIT) || 10,
  showDemoCredentials: e.SHOW_DEMO !== "false",
  demoUsers,
};
