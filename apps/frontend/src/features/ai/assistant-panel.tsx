"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AssistantPanel() {
  const router = useRouter();

  return (
    <Card>
      <h3 className="text-lg font-bold">Medical AI Assistant</h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Generate evidence-based post drafts, summarize papers, optimize profile
        keywords, and translate clinical content.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => router.push("/ai/summarize")}>
          Summarize Paper
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/ai/generate-post")}
        >
          Generate Post
        </Button>
        <Button variant="outline" onClick={() => router.push("/ai/translate")}>
          Translate
        </Button>
      </div>
    </Card>
  );
}
