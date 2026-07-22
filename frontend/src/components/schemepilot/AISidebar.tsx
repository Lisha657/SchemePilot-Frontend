import { FaXmark, FaTrophy, FaCircleCheck, FaGift, FaFileLines, FaCalendarDay, FaLightbulb, FaRobot } from "react-icons/fa6";
import { useEffect } from "react";

export default function AISidebar({
  isOpen, onClose, recommendation,
}: { isOpen: boolean; onClose: () => void; recommendation: any }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[1100] bg-foreground/30 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[1101] flex h-dvh w-full max-w-[440px] flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <FaRobot className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Powered by AI</div>
              <h2 className="text-base font-semibold tracking-tight text-foreground">Your Recommendation</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close AI panel"
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            <FaXmark />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!recommendation ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-primary" />
                Thinking through the best fit…
              </div>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border p-4">
                  <div className="skeleton h-4 w-1/3 rounded" />
                  <div className="skeleton mt-3 h-3 w-full rounded" />
                  <div className="skeleton mt-2 h-3 w-4/5 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <AISection icon={FaTrophy} title="Best Scheme" highlight>
                <p className="text-base font-medium text-foreground">{recommendation.bestScheme}</p>
              </AISection>
              <AISection icon={FaCircleCheck} title="Why you're eligible">
                <p>{recommendation.whyEligible}</p>
              </AISection>
              {recommendation.benefits?.length ? (
                <AISection icon={FaGift} title="Benefits">
                  <ul className="space-y-1.5">
                    {recommendation.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{b}</li>
                    ))}
                  </ul>
                </AISection>
              ) : null}
              {recommendation.documents?.length ? (
                <AISection icon={FaFileLines} title="Documents required">
                  <ul className="space-y-1.5">
                    {recommendation.documents.map((d: string, i: number) => (
                      <li key={i} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />{d}</li>
                    ))}
                  </ul>
                </AISection>
              ) : null}
              {recommendation.deadline && (
                <AISection icon={FaCalendarDay} title="Deadline">
                  <p>{recommendation.deadline}</p>
                </AISection>
              )}
              {recommendation.tips && (
                <AISection icon={FaLightbulb} title="Tips">
                  <p>{recommendation.tips}</p>
                </AISection>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function AISection({
  icon: Icon, title, children, highlight,
}: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <section
      className={`rounded-xl border p-4 ${highlight ? "border-primary/30 bg-accent/60" : "border-border bg-background"}`}
    >
      <h3 className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3 text-primary" />
        {title}
      </h3>
      <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
    </section>
  );
}
