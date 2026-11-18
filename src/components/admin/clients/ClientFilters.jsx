"use client";
/** ClientFilters.jsx - Search, broker, source and date-range filters for the admin clients table. */
import SearchInput from "@/components/ui/SearchInput";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function ClientFilters({ filters, setFilter, onReset, brokerOptions, onSearch }) {
  return (
    <div className="mb-4 space-y-3">
      <SearchInput onSearch={onSearch} placeholder="Search by client name or phone" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Select label="Broker" value={filters.broker} onChange={(e) => setFilter("broker", e.target.value)}
          options={[{ value: "", label: "All owners" }, ...brokerOptions]} />
        <Select label="Source" value={filters.source} onChange={(e) => setFilter("source", e.target.value)}
          options={[{ value: "", label: "All sources" }, { value: "Broker", label: "Broker" }, { value: "Direct", label: "Direct" }]} />
        <Input label="From" type="date" value={filters.from} onChange={(e) => setFilter("from", e.target.value)} />
        <Input label="To" type="date" value={filters.to} onChange={(e) => setFilter("to", e.target.value)} />
        <div className="flex items-end"><Button variant="secondary" onClick={onReset} className="w-full">Reset filters</Button></div>
      </div>
    </div>
  );
}
