"use client";

import { BriefcaseMedical, Clock3, MapPin, Stethoscope } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type JobItem = {
  id: string;
  title: string;
  hospital: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  experience: string;
  salary: string;
  postedAt: string;
  tags: string[];
};

const dummyJobs: JobItem[] = [
  {
    id: "job-1",
    title: "Consultant Cardiologist",
    hospital: "MediCare Super Specialty Hospital",
    location: "Bengaluru, India",
    type: "Full-time",
    experience: "8+ years",
    salary: "INR 48-60 LPA",
    postedAt: "2 days ago",
    tags: ["Interventional", "ICU", "DM Cardiology"],
  },
  {
    id: "job-2",
    title: "Clinical Research Associate",
    hospital: "Global Oncology Research Institute",
    location: "Mumbai, India",
    type: "Contract",
    experience: "3-5 years",
    salary: "INR 14-20 LPA",
    postedAt: "5 days ago",
    tags: ["GCP", "Clinical Trials", "Oncology"],
  },
  {
    id: "job-3",
    title: "Emergency Medicine Specialist",
    hospital: "Northside Trauma Center",
    location: "Delhi, India",
    type: "Full-time",
    experience: "5+ years",
    salary: "INR 30-42 LPA",
    postedAt: "1 week ago",
    tags: ["ACLS", "Trauma", "Night Shifts"],
  },
  {
    id: "job-4",
    title: "Pediatric Nurse Practitioner",
    hospital: "Sunrise Children Hospital",
    location: "Hyderabad, India",
    type: "Part-time",
    experience: "4+ years",
    salary: "INR 9-14 LPA",
    postedAt: "3 days ago",
    tags: ["Pediatrics", "NICU", "Patient Counseling"],
  },
  {
    id: "job-5",
    title: "Radiology AI Fellow",
    hospital: "Cambridge Clinical AI Lab",
    location: "Remote",
    type: "Contract",
    experience: "2+ years",
    salary: "USD 42k-55k",
    postedAt: "6 hours ago",
    tags: ["Python", "Medical Imaging", "Research"],
  },
];

const quickFilters = [
  "All",
  "Doctor",
  "Nurse",
  "Research",
  "Remote",
  "Full-time",
  "Hospital",
];

export function JobsList() {
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-wrap items-center gap-2">
          {quickFilters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                index === 0
                  ? "bg-sky-600 text-white"
                  : "bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-slate-800 dark:text-sky-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </Card>

      {dummyJobs.map((job) => (
        <Card key={job.id} className="p-0">
          <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {job.title}
                </h3>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Stethoscope className="h-4 w-4" />
                  {job.hospital}
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                {job.type}
              </span>
            </div>
          </div>

          <div className="space-y-4 px-5 py-4">
            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
              <p className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {job.location}
              </p>
              <p className="inline-flex items-center gap-1.5">
                <BriefcaseMedical className="h-4 w-4" />
                {job.experience}
              </p>
              <p className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {job.postedAt}
              </p>
            </div>

            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Compensation: {job.salary}
            </p>

            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button>Apply Now</Button>
              <Button variant="outline">Save Job</Button>
              <Button variant="ghost">Share</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
