/** Skeleton.jsx - Loading placeholders that match the real card/list/table shapes (no layout jump). */
export const Skeleton = ({ className = "" }) => <div className={`skeleton ${className}`} aria-hidden />;

export const StatCardSkeleton = () => (
  <div className="rounded-stat border border-card-border bg-card p-cardpad shadow-card">
    <Skeleton className="h-4 w-1/2" /><Skeleton className="mt-4 h-10 w-2/3" /><Skeleton className="mt-3 h-3 w-1/3" />
  </div>
);

export const ListSkeleton = ({ rows = 4 }) => (
  <div className="space-y-4" aria-busy="true">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4"><Skeleton className="h-10 w-10 shrink-0" />
        <div className="flex-1 space-y-2"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-3 w-4/5" /></div></div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 6 }) => (
  <div className="overflow-hidden rounded-section border border-card-border bg-card" aria-busy="true">
    <Skeleton className="h-12 rounded-none" />
    {Array.from({ length: rows }).map((_, i) => <Skeleton key={i} className="mx-4 my-3 h-6" />)}
  </div>
);

export const HeroSkeleton = () => <Skeleton className="h-56 rounded-hero" />;

/** Hero + 4 stat cards + list: the shape of most pages while they load. */
export const PageSkeleton = () => (
  <div className="space-y-gridgap" aria-busy="true" aria-label="Loading">
    <HeroSkeleton />
    <div className="grid gap-gridgap sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
    </div>
    <div className="rounded-section border border-card-border bg-card p-cardpad"><ListSkeleton /></div>
  </div>
);

/** A card with a few lines: the shape of form pages while they load. */
export const CardSkeleton = ({ lines = 4 }) => (
  <div className="space-y-4 rounded-section border border-card-border bg-card p-cardpad shadow-card" aria-busy="true" aria-label="Loading">
    <Skeleton className="h-6 w-1/3" />
    {Array.from({ length: lines }).map((_, i) => <Skeleton key={i} className="h-11" />)}
  </div>
);
