import { Navbar } from "@/components/layout/navbar";
import { ChatPanel } from "@/features/chat/chat-panel";

export default function MessagesPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <h1 className="mb-4 text-3xl font-extrabold text-slate-900 dark:text-white">
          Messages
        </h1>
        <ChatPanel />
      </section>
    </main>
  );
}
