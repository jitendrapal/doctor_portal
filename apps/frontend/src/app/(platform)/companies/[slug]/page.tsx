import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";

const companyData: Record<
  string,
  {
    name: string;
    category: string;
    followers: string;
    about: string;
    updates: string[];
  }
> = {
  "medtronic-india": {
    name: "Medtronic India",
    category: "Medical Device Company",
    followers: "412k followers",
    about:
      "Developing and scaling smart medical devices for critical care, cardiology, and surgical workflows.",
    updates: [
      "Launched ICU workflow analytics pilot in 5 metro hospitals.",
      "Published cardiac device safety update for FY 2026.",
      "Hiring biomedical data specialists in Bengaluru and Pune.",
    ],
  },
  "apollo-hospitals": {
    name: "Apollo Hospitals",
    category: "Hospital Network",
    followers: "1.2M followers",
    about:
      "Integrated multi-specialty healthcare network with focus on digital patient pathways and research partnerships.",
    updates: [
      "Expanded tele-consult network for oncology follow-ups.",
      "New stroke pathway benchmark report released.",
      "Opened fellowship intake for minimally invasive surgery.",
    ],
  },
  "pfizer-healthcare": {
    name: "Pfizer Healthcare",
    category: "Healthcare Company",
    followers: "892k followers",
    about:
      "Advancing therapeutics and public health programs through evidence-driven clinical innovation.",
    updates: [
      "Phase-3 multicenter trial enrollment milestone reached.",
      "Medical education grants announced for residency programs.",
      "New pharmacovigilance dashboard pilot launched.",
    ],
  },
};

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = companyData[slug];

  if (!company) {
    notFound();
  }

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          {company.name}
        </h1>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {company.category}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {company.followers}
          </p>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
            {company.about}
          </p>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Recent Updates (Demo)
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
            {company.updates.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>
      </section>
    </main>
  );
}
