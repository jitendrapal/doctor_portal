import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";

const imagePost = {
  title: "Hybrid ICU Command Dashboard",
  caption:
    "Prototype snapshot from this week’s ICU analytics round. Focused on alert fatigue reduction and fast escalation routing.",
  imageUrl:
    "https://images.unsplash.com/photo-1579684453377-1f7b6d4f8f88?auto=format&fit=crop&w=1400&q=80",
};

export default function ImagePostPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Image Post (Demo)
        </h1>
        <Card className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {imagePost.title}
          </h2>
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <img
              src={imagePost.imageUrl}
              alt={imagePost.title}
              className="h-72 w-full object-cover md:h-96"
            />
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-200">
            {imagePost.caption}
          </p>
        </Card>
      </section>
    </main>
  );
}
