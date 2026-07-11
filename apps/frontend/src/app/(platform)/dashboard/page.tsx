import { Navbar } from "@/components/layout/navbar";
import { InsightCards } from "@/features/dashboard/insight-cards";
import { AssistantPanel } from "@/features/ai/assistant-panel";

export default function DashboardPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Doctor Analytics Dashboard
        </h1>
        <InsightCards />
        <AssistantPanel />
      </section>
    </main>
  );
}
