import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";

const paper = {
  title: "AI-Assisted Triage in Cardiology Units",
  authors: ["A. Sharma", "N. Rao", "M. Chen"],
  findings: [
    "Reduced average triage decision time by 31%.",
    "Improved high-risk patient escalation accuracy.",
    "No increase in false critical alerts after validation.",
  ],
};

export default function SummarizePaperPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Summarize Paper (Demo)
        </h1>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Source paper
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
            {paper.title}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Authors: {paper.authors.join(", ")}
          </p>
        </Card>
        <Card>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            AI Summary
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
            {paper.findings.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Card>
      </section>
    </main>
  );
}
