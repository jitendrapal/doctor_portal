"use client";

import { useMemo, useState } from "react";
import { SendHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ChatMessage = {
  id: string;
  from: "me" | "other";
  text: string;
  at: string;
};

type ChatThread = {
  id: string;
  name: string;
  role: string;
  messages: ChatMessage[];
};

const threads: ChatThread[] = [
  {
    id: "t-nisha",
    name: "Dr. Nisha Rao",
    role: "Cardiologist",
    messages: [
      {
        id: "m-1",
        from: "other",
        text: "Can we discuss the tele-cardiology protocol update this afternoon?",
        at: "09:10",
      },
      {
        id: "m-2",
        from: "me",
        text: "Yes, sharing my notes by 2 PM.",
        at: "09:14",
      },
    ],
  },
  {
    id: "t-michael",
    name: "Dr. Michael Chen",
    role: "Clinical Researcher",
    messages: [
      {
        id: "m-3",
        from: "other",
        text: "Please review the abstract draft before submission.",
        at: "Yesterday",
      },
    ],
  },
];

export function ChatPanel() {
  const [activeThreadId, setActiveThreadId] = useState(threads[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<
    Record<string, ChatMessage[]>
  >({});

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) ?? threads[0],
    [activeThreadId],
  );

  const threadMessages = useMemo(() => {
    if (!activeThread) {
      return [];
    }

    return localMessages[activeThread.id] ?? activeThread.messages;
  }, [activeThread, localMessages]);

  const sendMessage = () => {
    if (!activeThread || !draft.trim()) {
      return;
    }

    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      from: "me",
      text: draft.trim(),
      at: "Now",
    };

    setLocalMessages((prev) => ({
      ...prev,
      [activeThread.id]: [
        ...(prev[activeThread.id] ?? activeThread.messages),
        newMessage,
      ],
    }));
    setDraft("");
  };

  if (!activeThread) {
    return (
      <Card>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          No chats yet.
        </p>
      </Card>
    );
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <Card>
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Chats
        </h2>
        <div className="mt-3 space-y-2">
          {threads.map((thread) => {
            const isActive = thread.id === activeThread.id;

            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActiveThreadId(thread.id)}
                className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                  isActive
                    ? "border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-900/20"
                    : "border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                }`}
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {thread.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {thread.role}
                </p>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="flex h-[70vh] flex-col">
        <div className="border-b border-slate-200 pb-3 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {activeThread.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {activeThread.role}
          </p>
        </div>

        <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
          {threadMessages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                message.from === "me"
                  ? "ml-auto bg-sky-600 text-white"
                  : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
              }`}
            >
              <p>{message.text}</p>
              <p
                className={`mt-1 text-[11px] ${
                  message.from === "me"
                    ? "text-sky-100"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {message.at}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2 border-t border-slate-200 pt-3 dark:border-slate-700">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type a message..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-300 dark:border-slate-700 dark:bg-slate-900"
          />
          <Button type="button" onClick={sendMessage}>
            <SendHorizontal className="mr-2 h-4 w-4" /> Send
          </Button>
        </div>
      </Card>
    </section>
  );
}
