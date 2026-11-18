/** loading.jsx - Route-level loading state for this page. */
import { CardSkeleton } from "@/components/ui/Skeleton";
export default function Loading() { return <div className="mx-auto max-w-2xl"><CardSkeleton lines={4} /></div>; }
