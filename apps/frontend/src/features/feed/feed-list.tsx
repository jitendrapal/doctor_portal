"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  CalendarDays,
  FileText,
  MessageCircle,
  Share2,
  ShieldCheck,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FeedItem = {
  id: string;
  profileId: string;
  author: string;
  avatarUrl: string;
  role: string;
  hospital: string;
  postedAt: string;
  postType: "Case Study" | "Research Update" | "Clinical Poll" | "Career";
  visibility: "Public" | "Connections";
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  tags: string[];
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  comments: Array<{
    id: string;
    author: string;
    role: string;
    avatarUrl: string;
    text: string;
    createdAt: string;
  }>;
};

const fakeFeed: FeedItem[] = [
  {
    id: "1",
    profileId: "u-nisha",
    author: "Dr. Nisha Rao",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=NishaRao",
    role: "Cardiologist",
    hospital: "Apollo Heart Institute",
    postedAt: "2h ago",
    postType: "Case Study",
    visibility: "Public",
    content:
      "New ESC guideline update on heart failure: key changes in patient stratification and treatment pathways.",
    imageUrl:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "Grand rounds: multidisciplinary heart failure protocol review",
    tags: ["#Cardiology", "#EvidenceBasedMedicine"],
    stats: {
      likes: 184,
      comments: 26,
      shares: 14,
    },
    comments: [
      {
        id: "c1",
        author: "Dr. Emily Joseph",
        role: "Internal Medicine",
        avatarUrl:
          "https://api.dicebear.com/9.x/notionists/svg?seed=EmilyJoseph",
        text: "Very useful summary. We are updating our ward checklist this week based on these recommendations.",
        createdAt: "46m",
      },
      {
        id: "c2",
        author: "Dr. Arjun Malik",
        role: "Resident",
        avatarUrl:
          "https://api.dicebear.com/9.x/notionists/svg?seed=ArjunMalik",
        text: "Could you share your protocol for high-risk discharge follow-up?",
        createdAt: "31m",
      },
    ],
  },
  {
    id: "2",
    profileId: "u-michael",
    author: "Dr. Michael Chen",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=MichaelChen",
    role: "Researcher",
    hospital: "Cambridge Clinical AI Lab",
    postedAt: "5h ago",
    postType: "Research Update",
    visibility: "Public",
    content:
      "Publishing pre-print on federated learning for radiology diagnostics. Looking for collaborators.",
    imageUrl:
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1400&q=80",
    imageCaption:
      "Imaging AI collaboration sprint - data harmonization dashboard",
    tags: ["#RadiologyAI", "#ResearchCollaboration"],
    stats: {
      likes: 129,
      comments: 18,
      shares: 21,
    },
    comments: [
      {
        id: "c3",
        author: "Dr. Sofia Nguyen",
        role: "Radiologist",
        avatarUrl:
          "https://api.dicebear.com/9.x/notionists/svg?seed=SofiaNguyen",
        text: "Interested from a multi-center perspective. We can contribute anonymized chest CT cohorts.",
        createdAt: "1h",
      },
    ],
  },
  {
    id: "3",
    profileId: "u-me",
    author: "Dr. Aisha Mehta",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=AishaMehta",
    role: "Neurologist",
    hospital: "CityCare Neuro Center",
    postedAt: "8h ago",
    postType: "Clinical Poll",
    visibility: "Connections",
    content:
      "For acute ischemic stroke in late-window cases, are you prioritizing perfusion imaging for all eligible referrals or using a pre-screen protocol first?",
    tags: ["#Neurology", "#StrokeCare", "#ClinicalDecisionMaking"],
    stats: {
      likes: 93,
      comments: 42,
      shares: 8,
    },
    comments: [
      {
        id: "c4",
        author: "Dr. Priya Menon",
        role: "Neuro ICU",
        avatarUrl:
          "https://api.dicebear.com/9.x/notionists/svg?seed=PriyaMenon",
        text: "We use a fast pre-screen then perfusion imaging for selected patients. Reduced door-to-needle delays by ~12 minutes.",
        createdAt: "2h",
      },
    ],
  },
  {
    id: "4",
    profileId: "u-nisha",
    author: "Dr. Nisha Rao",
    avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=NishaRao2",
    role: "Cardiologist",
    hospital: "Apollo Heart Institute",
    postedAt: "1d ago",
    postType: "Career",
    visibility: "Public",
    content:
      "Our heart failure unit is hiring one clinical fellow and two nursing educators. If interested, DM for details and role requirements.",
    imageUrl:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1400&q=80",
    imageCaption: "Team opening: Heart Failure Unit expansion",
    tags: ["#Hiring", "#HeartFailure", "#MedicalCareers"],
    stats: {
      likes: 148,
      comments: 17,
      shares: 34,
    },
    comments: [
      {
        id: "c5",
        author: "Dr. Rohan Shah",
        role: "DM Resident",
        avatarUrl: "https://api.dicebear.com/9.x/notionists/svg?seed=RohanShah",
        text: "Interested in the fellow position. I have shared my details via message.",
        createdAt: "19h",
      },
    ],
  },
];

export function FeedList() {
  const { data = [] } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => fakeFeed,
  });

  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [expandedComments, setExpandedComments] = useState<
    Record<string, boolean>
  >({});

  const mappedStats = useMemo(() => {
    return data.reduce<Record<string, FeedItem["stats"]>>((acc, item) => {
      const liked = likedPosts[item.id];
      acc[item.id] = {
        likes: item.stats.likes + (liked ? 1 : 0),
        comments: item.stats.comments,
        shares: item.stats.shares,
      };
      return acc;
    }, {});
  }, [data, likedPosts]);

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Clinical Feed
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <CalendarDays className="h-4 w-4" /> Updated in real-time
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Share a clinical update, research finding, or career opportunity.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="default">Create Post</Button>
            <Button variant="outline">Case Study</Button>
            <Button variant="outline">Research Note</Button>
            <Button variant="outline">Poll</Button>
            <Button variant="outline">Image Post</Button>
          </div>
        </div>
      </Card>

      {data.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
        >
          <Card className="p-0 overflow-hidden">
            <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <Link href={`/profile/${post.profileId}`}>
                  <img
                    src={post.avatarUrl}
                    alt={post.author}
                    className="h-12 w-12 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/profile/${post.profileId}`}>
                    <p className="truncate text-sm font-semibold text-slate-900 hover:text-sky-700 dark:text-slate-100 dark:hover:text-sky-300">
                      {post.author}
                    </p>
                  </Link>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {post.role} · {post.hospital}
                  </p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                    <span>{post.postedAt}</span>
                    <span>•</span>
                    <span>{post.visibility}</span>
                  </p>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {post.postType}
                  </span>
                  {post.visibility === "Public" ? (
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  ) : null}
                </div>
              </div>
            </div>

            <div className="px-5 py-4">
              <p className="text-[15px] leading-6 text-slate-800 dark:text-slate-100">
                {post.content}
              </p>

              {post.imageUrl ? (
                <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
                  <img
                    src={post.imageUrl}
                    alt={post.imageCaption ?? `${post.author} post image`}
                    className="h-72 w-full object-cover md:h-80"
                  />
                  {post.imageCaption ? (
                    <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-3 py-2 text-xs font-medium text-white">
                      {post.imageCaption}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <p className="mt-3 text-sm font-medium text-sky-600">
                {post.tags.join(" ")}
              </p>

              <div className="mt-3 flex items-center gap-2 md:hidden">
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {post.postType}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {mappedStats[post.id]?.likes ?? post.stats.likes} likes
                </span>
                <span>
                  {mappedStats[post.id]?.comments ?? post.stats.comments}{" "}
                  comments
                </span>
                <span>
                  {mappedStats[post.id]?.shares ?? post.stats.shares} shares
                </span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 border-y border-slate-100 py-2 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() =>
                    setLikedPosts((prev) => ({
                      ...prev,
                      [post.id]: !prev[post.id],
                    }))
                  }
                  className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    likedPosts[post.id]
                      ? "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" /> Like
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setExpandedComments((prev) => ({
                      ...prev,
                      [post.id]: !prev[post.id],
                    }))
                  }
                  className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <MessageCircle className="h-4 w-4" /> Comment
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>

              {post.postType === "Research Update" ? (
                <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50/70 px-3 py-2 text-xs text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/30 dark:text-blue-200">
                  <p className="flex items-center gap-1.5 font-medium">
                    <FileText className="h-3.5 w-3.5" /> Attached: Pre-print
                    summary and study metadata
                  </p>
                </div>
              ) : null}

              {expandedComments[post.id] ? (
                <div className="mt-4 space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex items-start gap-3">
                      <img
                        src={comment.avatarUrl}
                        alt={comment.author}
                        className="h-8 w-8 rounded-full border border-slate-200 object-cover dark:border-slate-700"
                      />
                      <div className="flex-1 rounded-xl bg-slate-50 px-3 py-2 dark:bg-slate-800/70">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                          {comment.author}
                          <span className="ml-1 font-normal text-slate-500">
                            · {comment.role}
                          </span>
                        </p>
                        <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                          {comment.text}
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400">
                          {comment.createdAt}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      placeholder="Write a professional comment..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-300 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-900"
                    />
                    <button
                      type="button"
                      className="rounded-xl bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                    >
                      Post
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
