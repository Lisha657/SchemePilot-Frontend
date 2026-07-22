import { FaLandmark } from "react-icons/fa6";

export default function Navbar() {
  return (
    <header className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 500px at 50% -10%, color-mix(in oklab, var(--primary) 22%, transparent), transparent 60%), linear-gradient(180deg, color-mix(in oklab, var(--primary) 6%, var(--background)), var(--background))",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/20">
            <FaLandmark className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-semibold tracking-tight text-foreground">SchemePilot</div>
            <div className="text-xs text-muted-foreground">Government Benefits. Simplified</div>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a className="transition hover:text-foreground" href="#schemes">Schemes</a>
          <a className="transition hover:text-foreground" href="#about">About</a>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold-soft/60 px-2.5 py-1 text-xs font-medium text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> AI Powered
          </span>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-6 pb-20 pt-10 text-center md:pb-28 md:pt-16">
        <h1
          className="animate-fade-in-up text-balance text-5xl font-normal leading-[1.05] tracking-tight text-foreground md:text-7xl"
          style={{ fontFamily: "var(--font-display)", animationDelay: "60ms" }}
        >
          Discover what's <em className="italic text-primary">yours</em>.
        </h1>
        <p
          className="animate-fade-in-up mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground md:text-lg"
          style={{ animationDelay: "120ms" }}
        >
          Powered by AI. Built for India.
        </p>
      </div>
    </header>
  );
}
