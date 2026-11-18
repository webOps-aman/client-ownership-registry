"use client";
/** Toast.jsx - react-hot-toast container themed with the design tokens. Use: import toast from "react-hot-toast". */
import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: "!rounded-item !border !border-card-border !bg-card !text-ink !shadow-card-hover !font-sans",
        success: { iconTheme: { primary: "#22C55E", secondary: "#fff" } },
        error: { iconTheme: { primary: "#EF4444", secondary: "#fff" } },
      }}
    />
  );
}
