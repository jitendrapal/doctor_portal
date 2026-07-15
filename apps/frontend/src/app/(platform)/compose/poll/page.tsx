import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";

const poll = {
  question: "Which intervention improved your OPD no-show rate most?",
  options: [
    { label: "Automated reminder calls", votes: 42 },
    { label: "WhatsApp confirmations", votes: 58 },
    { label: "Same-day follow-up slots", votes: 35 },
    { label: "Tele-consult fallback", votes: 49 },
  ],
};

export default function PollPage() {
  const total = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Poll (Demo)
        </h1>
        <Card>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {poll.question}
          </h2>
          <div className="mt-4 space-y-2">
            {poll.options.map((option) => {
              const pct =
                total > 0 ? Math.round((option.votes / total) * 100) : 0;

              return (
                <div
                  key={option.label}
                  className="rounded-lg border border-slate-200 p-3 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-200">
                      {option.label}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {pct}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-sky-600"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>
    </main>
  );
}
