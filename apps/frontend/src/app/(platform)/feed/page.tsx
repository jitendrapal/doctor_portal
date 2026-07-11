import { Navbar } from "@/components/layout/navbar";
import { FeedList } from "@/features/feed/feed-list";
import { AssistantPanel } from "@/features/ai/assistant-panel";
import { FeedRightSidebar } from "@/features/feed/feed-right-sidebar";

export default function FeedPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:px-8 lg:grid-cols-[2fr_1fr]">
        <FeedList />
        <div className="space-y-4">
          <AssistantPanel />
          <FeedRightSidebar />
        </div>
      </section>
    </main>
  );
}
