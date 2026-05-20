import type { HelpAreaId } from "./constants";

export type Specialist = {
  id: string;
  areaId: HelpAreaId;
  name: string;
  role: string;
  salaryMonthly: number;
  yearsExp: number;
  bio: string;
  image: string;
};

export const SPECIALISTS: Specialist[] = [
  // Organic & SEO
  {
    id: "hannah-reid",
    areaId: "seo",
    name: "Hannah Reid",
    role: "Head of SEO",
    salaryMonthly: 4300,
    yearsExp: 10,
    bio: "Technical SEO operator who's grown organic traffic 5x for B2B SaaS and marketplaces.",
    image: "/specialists/hannah-reid.png",
  },
  {
    id: "daniel-okafor",
    areaId: "seo",
    name: "Daniel Okafor",
    role: "Content Strategist",
    salaryMonthly: 3200,
    yearsExp: 6,
    bio: "Content systems for agency clients — briefs, editorial calendars and publishing ops.",
    image: "/specialists/daniel-okafor.png",
  },
  {
    id: "martin-tyler",
    areaId: "seo",
    name: "Martin Tyler",
    role: "Link Building Specialist",
    salaryMonthly: 3000,
    yearsExp: 7,
    bio: "Outreach and digital PR. Lands placements in top-tier publications without spam.",
    image: "/specialists/martin-tyler.png",
  },
  // Performance Marketing
  {
    id: "sarah-mitchell",
    areaId: "perf",
    name: "Sarah Mitchell",
    role: "Paid Media Lead",
    salaryMonthly: 4500,
    yearsExp: 9,
    bio: "Scaled Meta and Google spend past £2M/mo with ROAS-positive playbooks for DTC brands.",
    image: "/specialists/sarah-mitchell.png",
  },
  {
    id: "james-patel",
    areaId: "perf",
    name: "James Patel",
    role: "Performance Analyst",
    salaryMonthly: 3400,
    yearsExp: 5,
    bio: "Attribution modelling and incrementality tests — turns messy data into clear budget calls.",
    image: "/specialists/james-patel.png",
  },
  {
    id: "emma-clarke",
    areaId: "perf",
    name: "Emma Clarke",
    role: "Growth Marketer",
    salaryMonthly: 3100,
    yearsExp: 4,
    bio: "Full-funnel experiments across paid social, landing pages and lifecycle email.",
    image: "/specialists/emma-clarke.png",
  },
  // Design
  {
    id: "lucy-hart",
    areaId: "dsgn",
    name: "Lucy Hart",
    role: "Product Designer",
    salaryMonthly: 4200,
    yearsExp: 8,
    bio: "End-to-end product design for SaaS — research, systems and high-fidelity prototypes.",
    image: "/specialists/lucy-hart.png",
  },
  {
    id: "priya-nair",
    areaId: "dsgn",
    name: "Priya Nair",
    role: "UX Designer",
    salaryMonthly: 3600,
    yearsExp: 6,
    bio: "User journeys and usability testing that cut support tickets and lift conversion.",
    image: "/specialists/priya-nair.png",
  },
  {
    id: "tom-rivers",
    areaId: "dsgn",
    name: "Tom Rivers",
    role: "Brand Designer",
    salaryMonthly: 3300,
    yearsExp: 7,
    bio: "Visual identity and marketing assets that stay consistent across every channel.",
    image: "/specialists/tom-rivers.png",
  },
  // Content
  {
    id: "rachel-brooks",
    areaId: "cnt",
    name: "Rachel Brooks",
    role: "Content Director",
    salaryMonthly: 4100,
    yearsExp: 11,
    bio: "Editorial strategy for B2B — whitepapers, case studies and thought leadership programmes.",
    image: "/specialists/rachel-brooks.png",
  },
  {
    id: "alex-morgan",
    areaId: "cnt",
    name: "Alex Morgan",
    role: "Senior Copywriter",
    salaryMonthly: 3000,
    yearsExp: 5,
    bio: "Conversion copy for landing pages, ads and nurture flows that sound human, not templated.",
    image: "/specialists/alex-morgan.png",
  },
  {
    id: "nina-foster",
    areaId: "cnt",
    name: "Nina Foster",
    role: "Social Content Strategist",
    salaryMonthly: 2900,
    yearsExp: 4,
    bio: "Platform-native content calendars and community playbooks for founder-led brands.",
    image: "/specialists/nina-foster.png",
  },
];

export function specialistsForAreas(areaIds: HelpAreaId[]) {
  return SPECIALISTS.filter((s) => areaIds.includes(s.areaId));
}

export function averageSpecialistSalary(ids: string[]) {
  const selected = SPECIALISTS.filter((s) => ids.includes(s.id));
  if (selected.length === 0) return null;
  return Math.round(
    selected.reduce((sum, s) => sum + s.salaryMonthly, 0) / selected.length,
  );
}
