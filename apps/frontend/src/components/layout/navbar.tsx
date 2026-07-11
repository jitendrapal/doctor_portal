"use client";

import Link from "next/link";
import {
  Activity,
  Bell,
  BriefcaseMedical,
  FlaskConical,
  MessageCircle,
  UserRoundPlus,
  Users,
} from "lucide-react";
import {
  useConnections,
  networkUsers,
} from "@/features/network/connection-context";

const links = [
  { href: "/feed", label: "Feed", icon: Activity },
  { href: "/dashboard", label: "Dashboard", icon: Users },
  { href: "/jobs", label: "Jobs", icon: BriefcaseMedical },
  { href: "/requests", label: "Requests", icon: UserRoundPlus },
  { href: "/research", label: "Research", icon: FlaskConical },
  { href: "/messages", label: "Messages", icon: MessageCircle },
];

export function Navbar() {
  const { activeUserId, setActiveUserId, incomingRequests } = useConnections();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/95 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
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
        <div className="flex items-center gap-2">
          <select
            value={activeUserId}
            onChange={(event) => setActiveUserId(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            {networkUsers.map((user) => (
              <option key={user.id} value={user.id}>
                View as {user.name}
              </option>
            ))}
          </select>

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
    </header>
  );
}
