/** id.js - Unique ids and the display record number (#001). */
export const uid = (prefix = "id") => `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
export const formatRecordNo = (seq) => `#${String(seq).padStart(3, "0")}`;
export const nowIso = () => new Date().toISOString();
