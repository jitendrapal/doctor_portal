import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AssistantPanel() {
  return (
    <Card>
      <h3 className="text-lg font-bold">Medical AI Assistant</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Generate evidence-based post drafts, summarize papers, optimize profile
        keywords, and translate clinical content.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline">Summarize Paper</Button>
        <Button variant="outline">Generate Post</Button>
        <Button variant="outline">Translate</Button>
      </div>
    </Card>
  );
}
