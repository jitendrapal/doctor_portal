import { Card } from "@/components/ui/card";

const cards = [
  { title: "Profile Views", value: "2,184", delta: "+12.4%" },
  { title: "Connections", value: "864", delta: "+7.8%" },
  { title: "Research Reads", value: "4,012", delta: "+18.2%" },
  { title: "AI Insights Score", value: "91/100", delta: "+3.1%" },
];

export function InsightCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="med-grid">
          <p className="text-sm text-slate-500">{card.title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {card.value}
          </p>
          <p className="mt-2 text-sm text-emerald-600">{card.delta}</p>
        </Card>
      ))}
    </div>
  );
}
