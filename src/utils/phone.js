/**
 * phone.js - Phone normalization. A phone number is the unique identity of a client.
 * Strips spaces, dashes and brackets, accepts +91 / 91 / 0 prefixes, and compares on the last 10 digits.
 */
import { ENV } from "@/config/env";

/** Returns the 10-digit number, or "" if the input is not a valid phone. */
export function normalizePhone(input = "") {
  const digits = String(input).replace(/\D/g, "");
  const cc = ENV.defaultCountryCode.replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  if (digits.length === 10 + cc.length && digits.startsWith(cc)) return digits.slice(-10);
  return "";
}

export const isValidPhone = (input) => normalizePhone(input) !== "";

/** "9876543210" -> "+91 98765 43210" */
export const formatPhone = (p) => (p ? `${ENV.defaultCountryCode} ${p.slice(0, 5)} ${p.slice(5)}` : "");
