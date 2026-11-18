/** loading.jsx - Route-level loading state for Settings. */
import { CardSkeleton } from "@/components/ui/Skeleton";
export default function Loading() { return <div className="grid gap-gridgap md:grid-cols-2"><CardSkeleton lines={2} /><CardSkeleton lines={2} /></div>; }
