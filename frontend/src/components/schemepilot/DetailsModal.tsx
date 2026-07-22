import { FaXmark, FaLandmark, FaCircleCheck, FaFileLines, FaArrowUpRightFromSquare, FaGift } from "react-icons/fa6";
import { useEffect } from "react";

export default function DetailsModal({ scheme, onClose }: { scheme: any; onClose: () => void }) {
  useEffect(() => {
    if (!scheme) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [scheme, onClose]);

  if (!scheme) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in-up relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-8 shadow-2xl md:p-10"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition hover:bg-accent hover:text-foreground"
        >
          <FaXmark />
        </button>

        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <FaLandmark />
          </div>
          <div className="min-w-0 pr-10">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl" style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}>
              {scheme.name}
            </h2>
            <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-primary">
              <FaLandmark className="h-3 w-3" />
              <span>{scheme.government}</span>
            </div>
          </div>
        </div>

        <Section icon={FaCircleCheck} title="Eligibility">
          <p>{scheme.eligibility}</p>
        </Section>

        <Section icon={FaGift} title="Benefits">
          <p>{scheme.benefits}</p>
        </Section>

        {scheme.documents?.length ? (
          <Section icon={FaFileLines} title="Documents Required">
            <ul className="grid gap-2">
              {scheme.documents.map((doc: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {doc}
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <a
          href={scheme.link}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition hover:brightness-110"
        >
          Visit Official Website
          <FaArrowUpRightFromSquare className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function Section({
  icon: Icon, title, children,
}: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="mt-7">
      <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-primary" />
        {title}
      </h3>
      <div className="text-[15px] leading-relaxed text-foreground/80">{children}</div>
    </div>
  );
}
