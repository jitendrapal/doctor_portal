"use client";

import Link from "next/link";
import type { Route } from "next";
import {
  Activity,
  Bell,
  BriefcaseMedical,
  MessageCircle,
  UserRoundPlus,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  useConnections,
  networkUsers,
} from "@/features/network/connection-context";

const links: { href: Route; label: string; icon: LucideIcon }[] = [
  { href: "/feed", label: "Feed", icon: Activity },
  { href: "/dashboard", label: "Dashboard", icon: Users },
  { href: "/jobs", label: "Jobs", icon: BriefcaseMedical },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/requests", label: "Requests", icon: UserRoundPlus },
];

export function Navbar() {
  const { activeUserId, setActiveUserId, incomingRequests } = useConnections();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/95 dark:bg-slate-950/95">
      <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100"
          >
            MedConnect AI
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4" /> {label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 md:gap-2">
            <select
              value={activeUserId}
              onChange={(event) => setActiveUserId(event.target.value)}
              className="max-w-36 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 md:max-w-none"
            >
              {networkUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  View as {user.name}
                </option>
              ))}
            </select>

            <Link
              href="/messages"
              className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open chat"
              title="Open chat"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>

            <Link
              href="/requests"
              className="relative rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Bell className="h-5 w-5" />
              {incomingRequests.length > 0 ? (
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
              ) : null}
            </Link>
          </div>
        </div>

        <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={`mobile-${href}`}
              href={href}
              className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
