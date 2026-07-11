import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const heading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "MedConnect AI",
  description:
    "Professional social network for healthcare and medical research.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${heading.variable} ${body.variable} font-[var(--font-body)] antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
