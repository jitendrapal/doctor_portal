import { Navbar } from "@/components/layout/navbar";
import { Card } from "@/components/ui/card";

const sourceText =
  "Early stroke identification and rapid thrombolysis coordination can significantly reduce long-term neurological deficits.";

const translatedText =
  "Desejo identificar o AVC precocemente e coordenar rapidamente a trombólise pode reduzir significativamente os déficits neurológicos de longo prazo.";

export default function TranslatePage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl space-y-4 px-4 py-6 md:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Translate Clinical Content (Demo)
        </h1>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">English</p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            {sourceText}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Portuguese (Demo)
          </p>
          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">
            {translatedText}
          </p>
        </Card>
      </section>
    </main>
  );
}
