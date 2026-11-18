"use client";
/** ExportCsvButton.jsx - Exports the currently filtered rows. The CSV code is only downloaded when the button is clicked. */
import { Download } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatRecordNo } from "@/utils/id";
import { todayLocal } from "@/utils/date";

export default function ExportCsvButton({ rows }) {
  const exportCsv = async () => {
    const { toCsv, downloadCsv } = await import("@/utils/csv");
    const text = toCsv(rows, [
      { header: "Record", value: (c) => formatRecordNo(c.seq) },
      { header: "Client", value: (c) => c.name },
      { header: "Phone", value: (c) => c.phoneNormalized },
      { header: "Owner", value: (c) => c.ownerName },
      { header: "Source", value: (c) => c.source },
      { header: "Property", value: (c) => c.property },
      { header: "Registered on", value: (c) => c.createdAt },
      { header: "Visit", value: (c) => c.visitDateTime },
      { header: "Notes", value: (c) => c.notes },
    ]);
    downloadCsv(`clients-${todayLocal()}.csv`, text);
  };
  return <Button variant="secondary" icon={Download} onClick={exportCsv} disabled={!rows.length}>Export CSV</Button>;
}
