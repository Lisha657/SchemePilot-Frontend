import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";

import Navbar from "@/components/schemepilot/Navbar";
import SchemeForm from "@/components/schemepilot/SchemeForm";
import SchemeCard from "@/components/schemepilot/SchemeCard";
import DetailsModal from "@/components/schemepilot/DetailsModal";
import Loader from "@/components/schemepilot/Loader";
import AISidebar from "@/components/schemepilot/AISidebar";
import AIFab from "@/components/schemepilot/AIFab";

const SAMPLE_SCHEMES = [
  {
    id: "pm-kisan",
    name: "PM-KISAN Samman Nidhi",
    government: "Government of India",
    category: "Agriculture",
    incomeMax: 500000,
    state: "India",
    description: "Direct income support of ₹6,000 per year to farmer families, payable in three equal installments of ₹2,000 each.",
    eligibility: "Small and marginal farmer families owning cultivable land.",
    benefits: ["₹6,000 per year direct bank transfer", "Three equal installments", "No middlemen"],
    documents: ["Aadhaar card", "Land ownership records", "Bank account details"],
    deadline: "Ongoing — enroll anytime",
    applicationProcess: "Apply online through the PM-KISAN portal or visit your nearest agriculture office.",
  },
  {
    id: "ayushman-bharat",
    name: "Ayushman Bharat PM-JAY",
    government: "Ministry of Health & Family Welfare",
    category: "Health",
    incomeMax: 500000,
    state: "India",
    description: "Health insurance coverage up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
    eligibility: "Families identified as deprived, rural labourers, and identified occupational categories.",
    benefits: ["₹5 lakh health cover per family", "Cashless treatment at empaneled hospitals", "Covers pre-existing diseases"],
    documents: ["PM-JAY e-card", "Aadhaar card", "Ration card / SECC list"],
    deadline: "Ongoing — check eligibility online",
    applicationProcess: "Verify eligibility using Aadhaar at the nearest Ayushman Bharat center or empaneled hospital.",
  },
  {
    id: "mudra-yojana",
    name: "PM Mudra Yojana",
    government: "Government of India",
    category: "Business",
    incomeMax: 1000000,
    state: "India",
    description: "Loans up to ₹10 lakh for non-corporate, non-farm small and micro enterprises to promote entrepreneurship.",
    eligibility: "Indian citizens engaged in non-farm income generating activities.",
    benefits: ["Loans from ₹50,000 to ₹10 lakh", "No collateral for loans up to ₹10 lakh", "Flexible repayment tenure"],
    documents: ["Identity proof", "Address proof", "Business proof / project plan", "Bank account details"],
    deadline: "Ongoing — apply through banks",
    applicationProcess: "Apply at any commercial bank, regional rural bank, or microfinance institution.",
  },
  {
    id: "beti-padhao",
    name: "Beti Bachao Beti Padhao",
    government: "Ministry of Women & Child Development",
    category: "Women",
    incomeMax: 1000000,
    state: "India",
    description: "A campaign to address the declining child sex ratio and promote education and welfare of the girl child.",
    eligibility: "Families with girl children below 10 years.",
    benefits: ["Sukanya Samriddhi Account for savings", "Awareness and empowerment programs", "Education incentives"],
    documents: ["Girl child's birth certificate", "Parent's identity proof", "Bank account details"],
    deadline: "Ongoing — open Sukanya Samriddhi Account anytime",
    applicationProcess: "Open a Sukanya Samriddhi Account at a post office or bank.",
  },
  {
    id: "nps-lite",
    name: "National Pension Scheme Lite",
    government: "PFRDA / Government of India",
    category: "Employment",
    incomeMax: 300000,
    state: "India",
    description: "A low-cost pension scheme for economically disadvantaged sections providing a dignified old age.",
    eligibility: "Citizens aged 18–40 with low income seeking pension security.",
    benefits: ["Minimum monthly pension guarantee", "Government co-contribution", "Low contribution requirements"],
    documents: ["Aadhaar card", "Bank account details", "Mobile number linked to Aadhaar"],
    deadline: "Ongoing — enroll through authorized channels",
    applicationProcess: "Enroll through authorized banks or pension service providers.",
  },
  {
    id: "pm-awas",
    name: "Pradhan Mantri Awas Yojana",
    government: "Ministry of Housing & Urban Affairs",
    category: "Housing",
    incomeMax: 1800000,
    state: "India",
    description: "Housing for all with affordable home loans and interest subsidy for eligible beneficiaries.",
    eligibility: "Families without a pucca house as per income criteria (EWS/LIG/MIG).",
    benefits: ["Interest subsidy on home loans", "Credit linked subsidy", "Affordable housing options"],
    documents: ["Aadhaar card", "Income certificate", "Property documents", "Bank account details"],
    deadline: "Ongoing — apply through banks or housing portals",
    applicationProcess: "Apply through PM Awas portal, banks, or state nodal agencies.",
  },
];

const SAMPLE_RECOMMENDATION = {
  bestScheme: "PM-KISAN Samman Nidhi",
  whyEligible: "You are a farmer in Maharashtra with an annual income well within the scheme threshold. Your land ownership records make you eligible for direct income support.",
  benefits: [
    "₹6,000 per year direct bank transfer in three installments",
    "No application fee or paperwork renewal needed",
    "Funds transferred directly to your linked bank account",
  ],
  documents: [
    "Aadhaar card linked to bank account",
    "Land ownership records / 7/12 extract",
    "Active bank account details",
  ],
  deadline: "Ongoing — enrollments accepted year-round",
  tips: "Ensure your bank account is linked with Aadhaar and updated on the PM-KISAN portal to avoid payment delays.",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SchemePilot — Discover government schemes you qualify for" },
      { name: "description", content: "AI-powered eligibility checks across Indian government schemes. Free, fast, and tailored to your profile." },
      { property: "og:title", content: "SchemePilot — Government Benefits. Simplified" },
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
  const [schemes, setSchemes] = useState<any[]>(SAMPLE_SCHEMES);
  const [loading, setLoading] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [recommendation, setRecommendation] = useState<any>(SAMPLE_RECOMMENDATION);

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
