import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";

const caseStudy = {
  patient: "56-year-old male, Type 2 diabetes and hypertension",
  summary:
    "Presented with atypical chest pain. ECG non-specific. High-sensitivity troponin trend and point-of-care echo led to early NSTEMI protocol activation.",
  outcome:
    "PCI completed within 90 minutes. Discharged day 3 with structured cardiac rehab follow-up.",
  learning:
    "Use protocolized serial biomarkers when initial ECG is inconclusive.",
};

export default function CaseStudyPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Case Study (Demo)
        </h1>
        <Card className="space-y-3">
          <p className="text-sm text-slate-700 dark:text-slate-200">
            <span className="font-semibold">Patient:</span> {caseStudy.patient}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            <span className="font-semibold">Summary:</span> {caseStudy.summary}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            <span className="font-semibold">Outcome:</span> {caseStudy.outcome}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            <span className="font-semibold">Key Learning:</span>{" "}
            {caseStudy.learning}
          </p>
        </Card>
      </section>
    </main>
  );
}
