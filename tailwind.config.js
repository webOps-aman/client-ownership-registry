/**
 * tailwind.config.js
 * Single source of truth for every design token (colors, fonts, sizes,
 * shadows, radii, spacing). Components use these tokens only.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-fraunces)", '"DM Serif Display"', "Georgia", "serif"],
        sans: ["var(--font-inter)", '"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        sidebar: { DEFAULT: "#15233F", active: "#24344F", text: "#E5E9F0", label: "#8A96AB", "active-text": "#F59E0B" },
        page: "#FAF7F2",
        topbar: "#FBF8F3",
        card: { DEFAULT: "#FFFFFF", border: "#EFE9DF" },
        accent: { DEFAULT: "#F59E0B", name: "#F28C28" },
        btn: { DEFAULT: "#F5A524", text: "#1A2540" },
        hero: {
          eyebrow: "#F59E0B", subtitle: "#D5DBE6",
          pill: "rgba(255,255,255,0.06)", "pill-border": "rgba(255,255,255,0.18)", grid: "rgba(255,255,255,0.04)",
        },
        ink: { DEFAULT: "#14213D", muted: "#6B7280" },
        // Login brand panel (black + gold)
        login: { black: "#0B0B0D", ink: "#121116", warm: "#1B1409", gold: "#E0A526" },
        success: "#0F8A5F",
        warning: "#D97706",
        today: "#C2410C",
        status: { orange: "#F59E0B", red: "#EF4444", green: "#22C55E" },
        pill: { DEFAULT: "#FFFFFF", border: "#E8E2D8" },
        chip: {
          blue: { bg: "#E0F2FE", icon: "#0284C7" },
          green: { bg: "#D1FAE5", icon: "#059669" },
          amber: { bg: "#FEF3C7", icon: "#D97706" },
        },
      },
      backgroundImage: {
        hero: "linear-gradient(110deg, #0F1B33 0%, #142544 55%, #6B4A2B 100%)",
        "line-blue": "linear-gradient(90deg,#7DD3FC,#BAE6FD)",
        "line-green": "linear-gradient(90deg,#6EE7B7,#A7F3D0)",
        "line-amber": "linear-gradient(90deg,#FCD34D,#FDE68A)",
      },
      // h1 and stat numbers scale down on mobile through clamp()
      fontSize: {
        "hero-h1": ["clamp(2.25rem, 1rem + 5vw, 3.5rem)", { lineHeight: "1.1", fontWeight: "700" }],
        eyebrow: ["14px", { fontWeight: "600", letterSpacing: "0.15em" }],
        "hero-sub": ["clamp(1rem, 0.8rem + 1vw, 1.25rem)", { fontWeight: "400" }],
        "hero-small": ["15px", {}],
        "logo-title": ["24px", { fontWeight: "700" }],
        "logo-sub": ["14px", { fontWeight: "400" }],
        "side-label": ["13px", { fontWeight: "600", letterSpacing: "0.12em" }],
        "side-item": ["17px", { fontWeight: "500" }],
        breadcrumb: ["17px", {}],
        "section-title": ["22px", { fontWeight: "700" }],
        "section-sub": ["17px", {}],
        "item-title": ["18px", { fontWeight: "500" }],
        "item-body": ["17px", { lineHeight: "1.45" }],
        meta: ["14px", {}],
        "stat-label": ["15px", { fontWeight: "500" }],
        "stat-number": ["clamp(2rem, 1rem + 3vw, 2.75rem)", { fontWeight: "700" }],
        "stat-caption": ["14px", {}],
      },
      boxShadow: {
        card: "0 4px 20px rgba(20,33,61,0.06)",
        "card-hover": "0 8px 28px rgba(20,33,61,0.10)",
        hero: "0 10px 40px rgba(15,27,51,0.25)",
        btn: "0 4px 14px rgba(245,165,36,0.35)",
        pill: "0 1px 3px rgba(0,0,0,0.05)",
      },
      borderRadius: { hero: "28px", stat: "20px", section: "24px", item: "14px", pill: "999px" },
      spacing: { page: "40px", sidebar: "316px", gridgap: "20px", cardpad: "20px" },
      transitionDuration: { DEFAULT: "200ms" },
    },
  },
  plugins: [],
};
