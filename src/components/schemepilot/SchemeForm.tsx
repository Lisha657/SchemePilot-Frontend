import { useState } from "react";
import { FaUser, FaCalendar, FaVenusMars, FaLocationDot, FaBriefcase, FaLayerGroup, FaIndianRupeeSign, FaArrowRight } from "react-icons/fa6";

type FormData = {
  name: string; age: string; gender: string; state: string;
  occupation: string; category: string; income: string;
};

const inputCls =
  "peer h-12 w-full rounded-xl border border-input bg-card px-11 text-[15px] text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/15";

function Field({
  label, icon: Icon, children,
}: { label: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        {children}
      </div>
    </div>
  );
}

export default function SchemeForm({ onSearch }: { onSearch: (d: FormData) => void }) {
  const [formData, setFormData] = useState<FormData>({
    name: "", age: "", gender: "", state: "", occupation: "", category: "", income: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <section className="mx-auto w-[92%] max-w-3xl pb-20" id="schemes">
      <div
        className="animate-fade-in-up rounded-3xl border border-border bg-card p-6 shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_80px_-30px_rgba(15,45,30,0.2)] md:p-10"
      >
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
            Eligibility Check
          </div>
          <h2 className="text-3xl font-normal tracking-tight text-foreground md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
            Tell us about yourself
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We'll match you with schemes tailored to your profile. Takes 30 seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Full Name" icon={FaUser}>
            <input className={inputCls} type="text" name="name" placeholder="e.g. Aarav Sharma" value={formData.name} onChange={handleChange} />
          </Field>
          <Field label="Age" icon={FaCalendar}>
            <input className={inputCls} type="number" name="age" placeholder="Enter your age" value={formData.age} onChange={handleChange} required />
          </Field>
          <Field label="Gender" icon={FaVenusMars}>
            <select className={inputCls + " appearance-none pr-10"} name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select gender</option>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </Field>
          <Field label="State" icon={FaLocationDot}>
            <input className={inputCls} type="text" name="state" placeholder="e.g. Maharashtra" value={formData.state} onChange={handleChange} required />
          </Field>
          <Field label="Occupation" icon={FaBriefcase}>
            <select className={inputCls + " appearance-none pr-10"} name="occupation" value={formData.occupation} onChange={handleChange} required>
              <option value="">Select occupation</option>
              <option>Student</option><option>Farmer</option><option>Employee</option>
              <option>Self Employed</option><option>Unemployed</option>
            </select>
          </Field>
          <Field label="Category" icon={FaLayerGroup}>
            <select className={inputCls + " appearance-none pr-10"} name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select category</option>
              <option>General</option><option>OBC</option><option>SC</option><option>ST</option>
            </select>
          </Field>
          <div className="md:col-span-2">
            <Field label="Annual Income (₹)" icon={FaIndianRupeeSign}>
              <input className={inputCls} type="number" name="income" placeholder="e.g. 250000" value={formData.income} onChange={handleChange} required />
            </Field>
          </div>

          <button
            type="submit"
            className="group mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-8px_color-mix(in_oklab,var(--primary)_50%,transparent)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25 md:col-span-2"
          >
            Find my schemes
            <FaArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </section>
  );
}
