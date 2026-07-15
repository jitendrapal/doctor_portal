import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";

const draft = {
  title: "Improving Stroke Door-to-Needle Time",
  audience: "Connections",
  content:
    "Our neuro team reduced average door-to-needle time from 51 to 34 minutes by introducing parallel triage triggers and bedside checklist prompts.",
  tags: ["#Neurology", "#StrokeCare", "#ClinicalOps"],
};

export default function CreatePostPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Create Post (Demo)
        </h1>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Title</p>
          <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">
            {draft.title}
          </p>
          <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
            {draft.content}
          </p>
          <p className="mt-3 text-sm font-medium text-sky-700 dark:text-sky-300">
            {draft.tags.join(" ")}
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Visibility: {draft.audience}
          </p>
        </Card>
      </section>
    </main>
  );
}
