import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";

const generatedPost = {
  tone: "Professional and evidence-based",
  draft:
    "Evidence-backed remote monitoring in chronic heart failure can reduce avoidable readmissions when paired with weekly clinician review. In our latest review cycle, adherence improved significantly after introducing structured patient education calls. Curious to learn how others are designing scalable tele-cardiology workflows across urban and semi-urban centers.",
  hashtags: ["#Cardiology", "#Telemedicine", "#DigitalHealth", "#PatientCare"],
};

export default function GeneratePostPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Generate Post (Demo)
        </h1>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Tone</p>
          <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {generatedPost.tone}
          </p>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Draft Post
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
            {generatedPost.draft}
          </p>
          <p className="mt-3 text-sm font-medium text-sky-700 dark:text-sky-300">
            {generatedPost.hashtags.join(" ")}
          </p>
        </Card>
      </section>
    </main>
  );
}
