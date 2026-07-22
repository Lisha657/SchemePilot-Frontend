export default function Loader() {
  return (
    <div className="mx-auto w-[92%] max-w-6xl pb-12">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
        <span className="text-sm text-muted-foreground">Finding schemes for you…</span>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="skeleton h-11 w-11 rounded-xl" />
              <div className="skeleton h-6 w-20 rounded-full" />
            </div>
            <div className="skeleton mt-4 h-5 w-3/4 rounded-md" />
            <div className="skeleton mt-2 h-4 w-1/2 rounded-md" />
            <div className="my-5 h-px bg-border" />
            <div className="skeleton h-4 w-2/3 rounded-md" />
            <div className="skeleton mt-2 h-4 w-1/2 rounded-md" />
            <div className="skeleton mt-6 h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
