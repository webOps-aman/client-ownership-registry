"use client";
/** LogFilters.jsx - User, optional extra select, and date-range filters shared by the log pages. extra = { key, label, options } */
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LogFilters({ filters, setFilter, onReset, userOptions, extra }) {
  return (
    <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Select label="User" value={filters.user} onChange={(e) => setFilter("user", e.target.value)} options={[{ value: "", label: "All users" }, ...userOptions]} />
      {extra && <Select label={extra.label} value={filters[extra.key]} onChange={(e) => setFilter(extra.key, e.target.value)} options={extra.options} />}
      <Input label="From" type="date" value={filters.from} onChange={(e) => setFilter("from", e.target.value)} />
      <Input label="To" type="date" value={filters.to} onChange={(e) => setFilter("to", e.target.value)} />
      <div className="flex items-end"><Button variant="secondary" onClick={onReset} className="w-full">Reset filters</Button></div>
    </div>
  );
}
