import { FaLandmark, FaIndianRupeeSign, FaLocationDot, FaArrowRight } from "react-icons/fa6";

export default function SchemeCard({ scheme, onViewDetails }: { scheme: any; onViewDetails: (s: any) => void }) {
  return (
    <div className="animate-fade-in-up group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_30px_60px_-24px_rgba(15,45,30,0.25)]">
      <div
        aria-hidden
        className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition group-hover:opacity-100"
      />
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
          <FaLandmark className="h-4 w-4" />
        </div>
        <span className="rounded-full border border-gold/40 bg-gold-soft/50 px-2.5 py-1 text-[11px] font-medium tracking-wide text-foreground">
          {scheme.category || "Scheme"}
        </span>
      </div>

      <h3 className="mt-4 line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground">
        {scheme.name}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{scheme.government}</p>

      <div className="my-5 h-px bg-border" />

      <div className="space-y-2.5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2.5">
          <FaIndianRupeeSign className="h-3.5 w-3.5 text-primary" />
          <span>
            Income ≤ ₹
            {scheme.incomeMax ? Number(scheme.incomeMax).toLocaleString("en-IN") : "No limit"}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <FaLocationDot className="h-3.5 w-3.5 text-primary" />
          <span>{scheme.state || "India"}</span>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(scheme)}
        className="group/btn mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-medium text-foreground transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        View details
        <FaArrowRight className="h-3 w-3 transition group-hover/btn:translate-x-0.5" />
      </button>
    </div>
  );
}
