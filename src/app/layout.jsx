/**
 * layout.jsx - Root layout. Loads Fraunces + Inter with next/font
 * (self-hosted, no layout shift) and exposes them as CSS variables.
 */
import { Fraunces, Inter } from "next/font/google";
import { ENV } from "@/config/env";
import StoreProvider from "@/store/StoreProvider";
import AppToaster from "@/components/ui/Toast";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = { title: ENV.appName, description: `${ENV.appName} - ${ENV.companyName}` };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <StoreProvider>{children}</StoreProvider>
        <AppToaster />
      </body>
    </html>
  );
}
