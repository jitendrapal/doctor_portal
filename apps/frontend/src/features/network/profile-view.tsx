"use client";

import Link from "next/link";
import { CheckCircle2, UserPlus2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/mock-network";
import { useConnections } from "@/features/network/connection-context";

export function ProfileView({ profileId }: { profileId: string }) {
  const profile = getUserById(profileId);
  const {
    sendRequest,
    acceptRequest,
    getPendingIncomingRequestIdFrom,
    getConnectionStatusWith,
    acceptedConnectionsCount,
  } = useConnections();

  if (!profile) {
    return (
      <Card>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Profile not found.
        </p>
      </Card>
    );
  }

  const status = getConnectionStatusWith(profileId);

  const receivedRequest = status === "PENDING_RECEIVED";

  return (
    <div className="space-y-4">
      <Card className="p-0 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-sky-500 to-cyan-400" />
        <div className="px-5 pb-5">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="-mt-10 h-20 w-20 rounded-full border-4 border-white bg-white dark:border-slate-900"
          />
          <h1 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {profile.name}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {profile.role} · {profile.organization}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {profile.location}
          </p>
          <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
            {profile.bio}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {profile.specialties.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {status === "NONE" ? (
              <Button onClick={() => sendRequest(profile.id)}>
                <UserPlus2 className="mr-2 h-4 w-4" /> Send Request
              </Button>
            ) : null}

            {status === "PENDING_SENT" ? (
              <Button variant="outline" disabled>
                Request Sent
              </Button>
            ) : null}

            {receivedRequest ? (
              <Button
                onClick={() => {
                  const requestId = getPendingIncomingRequestIdFrom(profile.id);
                  if (requestId) {
                    acceptRequest(requestId);
                  }
                }}
              >
                Accept Request
              </Button>
            ) : null}

            {status === "CONNECTED" ? (
              <Button
                variant="outline"
                className="text-emerald-700 border-emerald-300"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" /> Connected
              </Button>
            ) : null}

            <Link href="/requests">
              <Button variant="ghost">Open Requests Inbox</Button>
            </Link>
          </div>
        </div>
      </Card>

      <Card>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Active account connections:{" "}
          <span className="font-semibold">{acceptedConnectionsCount}</span>
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Tip: switch account from top navbar to simulate the other person
          accepting your request.
        </p>
      </Card>
    </div>
  );
}
