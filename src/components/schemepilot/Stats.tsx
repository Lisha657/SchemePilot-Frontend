import { FaLandmark, FaUsers, FaRobot, FaCircleCheck } from "react-icons/fa6";

const stats = [
  { icon: FaLandmark, value: "35+", label: "Government Schemes" },
  { icon: FaUsers, value: "28", label: "States Covered" },
  { icon: FaRobot, value: "AI", label: "Smart Recommendations" },
  { icon: FaCircleCheck, value: "100%", label: "Free to Use" },
];

export default function Stats() {
  return (
    <section className="mx-auto -mt-10 mb-16 grid w-[92%] max-w-5xl grid-cols-2 gap-3 md:mt-[-72px] md:grid-cols-4 md:gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={s.label}
            className="animate-fade-in-up group rounded-2xl border border-border bg-card p-5 shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_50px_-20px_rgba(15,45,30,0.12)] transition hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgba(0,0,0,0.02),0_28px_60px_-20px_rgba(15,45,30,0.18)]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-4 w-4" />
            </div>
            <div className="text-2xl font-semibold tracking-tight text-foreground">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        );
      })}
    </section>
  );
}
