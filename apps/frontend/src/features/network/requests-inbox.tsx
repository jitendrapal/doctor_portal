"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/mock-network";
import { useConnections } from "@/features/network/connection-context";

export function RequestsInbox() {
  const { incomingRequests, acceptRequest, cancelRequest, activeUserId } =
    useConnections();

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          Connection Requests
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Requests received by your active account. Accept or cancel, similar to
          LinkedIn invitations.
        </p>
      </Card>

      {incomingRequests.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            No pending requests.
          </p>
        </Card>
      ) : null}

      {incomingRequests.map((request) => {
        const sender = getUserById(request.fromUserId);
        if (!sender) {
          return null;
        }

        return (
          <Card
            key={request.id}
            className="flex flex-wrap items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={sender.avatarUrl}
                alt={sender.name}
                className="h-11 w-11 rounded-full border border-slate-200 dark:border-slate-700"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {sender.name}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {sender.role} · {sender.organization}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Link href={`/profile/${sender.id}`}>
                <Button variant="outline">View Profile</Button>
              </Link>
              <Button onClick={() => acceptRequest(request.id)}>Accept</Button>
              <Button
                variant="ghost"
                onClick={() => cancelRequest(request.id)}
                className="text-slate-600"
              >
                Cancel
              </Button>
            </div>
          </Card>
        );
      })}

      <Card>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Active account: {activeUserId}
        </p>
      </Card>
    </div>
  );
}
