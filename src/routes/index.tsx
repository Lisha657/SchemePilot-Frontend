import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";
import { FaMagnifyingGlass } from "react-icons/fa6";

import Navbar from "@/components/schemepilot/Navbar";
import SchemeForm from "@/components/schemepilot/SchemeForm";
import SchemeCard from "@/components/schemepilot/SchemeCard";
import DetailsModal from "@/components/schemepilot/DetailsModal";
import Loader from "@/components/schemepilot/Loader";
import AISidebar from "@/components/schemepilot/AISidebar";
import AIFab from "@/components/schemepilot/AIFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SchemePilot — Discover government schemes you qualify for" },
      { name: "description", content: "AI-powered eligibility checks across 35+ Indian government schemes. Free, fast, and tailored to your profile." },
      { property: "og:title", content: "SchemePilot — Government Benefits, Simplified" },
      { property: "og:description", content: "Find schemes you actually qualify for. Powered by AI. Built for India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" },
    ],
  }),
  component: App,
});

function App() {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  const handleSearch = async (formData: any) => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/eligible", {
        params: {
          age: formData.age, income: formData.income, state: formData.state,
          occupation: formData.occupation, gender: formData.gender, category: formData.category,
        },
      });
      const eligibleSchemes = response.data;
      setSchemes(eligibleSchemes);
      setIsSidebarOpen(true);
      setRecommendation(null);
      setLoading(false);

      axios
        .post("http://127.0.0.1:8000/recommend", { user: formData, schemes: eligibleSchemes })
        .then((response) => setRecommendation(response.data.recommendation))
        .catch((error) => {
          console.error(error);
          setRecommendation({
            bestScheme: "Unavailable",
            whyEligible: "Unable to generate AI recommendation.",
            benefits: [], documents: [], deadline: "", tips: "",
          });
        });
    } catch (error) {
      console.error(error);
      alert("Unable to fetch schemes.");
      setLoading(false);
    }
  };

  const handleViewDetails = (scheme: any) => setSelectedScheme(scheme);
  const closeModal = () => setSelectedScheme(null);

  const filteredSchemes = schemes.filter((scheme: any) => {
    const matchesSearch = scheme.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-dvh">
      <Navbar />
      <SchemeForm onSearch={handleSearch} />

      {loading && <Loader />}

      {!loading && schemes.length > 0 && (
        <section className="mx-auto w-[92%] max-w-6xl pb-20">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="relative min-w-0 flex-1">
              <FaMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search schemes…"
                className="h-12 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/15"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="h-12 w-full shrink-0 rounded-xl border border-input bg-card px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15 sm:w-56"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option>All</option><option>Education</option><option>Agriculture</option>
              <option>Women</option><option>Health</option><option>Employment</option>
              <option>Housing</option><option>Business</option><option>Disability</option>
              <option>Senior Citizen</option>
            </select>
          </div>

          <div className="mb-6 flex items-baseline justify-between">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {filteredSchemes.length} {filteredSchemes.length === 1 ? "scheme" : "schemes"} found
            </h3>
            <span className="text-xs text-muted-foreground">Tailored to your profile</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSchemes.length > 0 ? (
              filteredSchemes.map((scheme: any) => (
                <SchemeCard key={scheme.id} scheme={scheme} onViewDetails={handleViewDetails} />
              ))
            ) : (
              <p className="col-span-full py-16 text-center text-muted-foreground">
                No schemes match your search.
              </p>
            )}
          </div>
        </section>
      )}

      <AIFab onClick={() => setIsSidebarOpen(true)} />
      <DetailsModal scheme={selectedScheme} onClose={closeModal} />
      <AISidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} recommendation={recommendation} />
    </div>
  );
}
