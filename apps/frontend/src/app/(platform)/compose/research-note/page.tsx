import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";

const note = {
  topic: "AI triage assistant in emergency neurology",
  hypothesis:
    "A rules-plus-ML triage model can lower missed high-risk cases compared with manual-only triage.",
  dataset: "12,400 anonymized triage records across 3 centers",
  status: "Draft for peer feedback",
};

export default function ResearchNotePage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Research Note (Demo)
        </h1>
        <Card className="space-y-3">
          <p className="text-sm text-slate-700 dark:text-slate-200">
            <span className="font-semibold">Topic:</span> {note.topic}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            <span className="font-semibold">Hypothesis:</span> {note.hypothesis}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            <span className="font-semibold">Dataset:</span> {note.dataset}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Status: {note.status}
          </p>
        </Card>
      </section>
    </main>
  );
}
