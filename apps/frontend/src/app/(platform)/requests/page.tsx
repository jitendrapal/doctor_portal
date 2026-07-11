import { Navbar } from "@/components/layout/navbar";
import { RequestsInbox } from "@/features/network/requests-inbox";

export default function RequestsPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-6 md:px-8">
        <RequestsInbox />
      </section>
    </main>
  );
}
