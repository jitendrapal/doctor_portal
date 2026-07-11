import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { SignInForm } from "@/features/auth/signin-form";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto grid min-h-[85vh] max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-2">
        <div>
          <p className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
            Healthcare Professional Network
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-6xl">
            The trusted social and research network for modern medicine.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Connect doctors, hospitals, students, and researchers in one secure
            platform with AI assistance, career growth, and peer-reviewed
            knowledge sharing.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/feed">
              <Button size="lg">Enter Feed</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                Open Dashboard
              </Button>
            </Link>
          </div>
        </div>
        <div>
          <SignInForm />
        </div>
      </section>
    </main>
  );
}
