import { Navbar } from "@/components/layout/navbar";
import { JobsList } from "@/features/jobs/jobs-list";
import { AssistantPanel } from "@/features/ai/assistant-panel";

export default function JobsPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-8 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Healthcare Jobs
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Discover curated opportunities for doctors, nurses, researchers,
              and allied healthcare professionals.
            </p>
          </div>
          <JobsList />
        </div>
        <div className="space-y-4">
          <AssistantPanel />
        </div>
      </section>
    </main>
  );
}
