"use client";

import { useRouter } from "next/navigation";
import { Activity, Building2, Globe, TrendingUp, Users2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const insightItems = [
  { label: "Profile Views", value: "+28%", icon: TrendingUp },
  { label: "Post Engagement", value: "1,284", icon: Activity },
  { label: "New Connections", value: "34", icon: Users2 },
];

const companyPages = [
  {
    slug: "medtronic-india",
    name: "Medtronic India",
    category: "Medical Device Company",
    followers: "412k followers",
    color: "from-sky-700 to-blue-500",
  },
  {
    slug: "apollo-hospitals",
    name: "Apollo Hospitals",
    category: "Hospital Network",
    followers: "1.2M followers",
    color: "from-cyan-700 to-teal-500",
  },
  {
    slug: "pfizer-healthcare",
    name: "Pfizer Healthcare",
    category: "Healthcare Company",
    followers: "892k followers",
    color: "from-indigo-700 to-violet-500",
  },
];

const marketUpdates = [
  "WHO updates telemedicine implementation guidance for low-resource regions.",
  "CME credit reforms announced for digital-first training programs.",
  "Top hiring trend: Critical care and oncology specialists in APAC.",
];

export function FeedRightSidebar() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Weekly Insights
        </h3>
        <div className="mt-3 space-y-2">
          {insightItems.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700"
            >
              <p className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Icon className="h-4 w-4" /> {label}
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {value}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Latest Company Pages
          </h3>
          <Building2 className="h-5 w-5 text-slate-400" />
        </div>

        <div className="mt-3 space-y-3">
          {companyPages.map((company) => (
            <div
              key={company.name}
              className="rounded-xl border border-slate-200 p-3 dark:border-slate-700"
            >
              <div
                className={`mb-2 h-2 w-full rounded-full bg-gradient-to-r ${company.color}`}
              />
              <p className="font-semibold text-slate-900 dark:text-slate-100">
                {company.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {company.category}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {company.followers}
              </p>
              <Button
                variant="outline"
                className="mt-2 h-8 w-full text-xs"
                onClick={() => router.push(`/companies/${company.slug}`)}
              >
                Follow Page
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Healthcare Intel
        </h3>
        <div className="mt-3 space-y-2">
          {marketUpdates.map((update) => (
            <div
              key={update}
              className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
            >
              <p className="inline-flex gap-2">
                <Globe className="mt-0.5 h-4 w-4 text-slate-500" />
                <span>{update}</span>
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
