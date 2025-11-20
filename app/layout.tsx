import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import { SupabaseProvider } from "@/components/providers/supabase-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SchoolAgent | AI-powered school comms for parents",
  description: "Streamline school emails, calendars, and PDFs with AI."
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="min-h-full bg-slate-50 text-slate-900">
      <body className={inter.className}>
        <SupabaseProvider>
          <div className="flex min-h-screen flex-col">{children}</div>
        </SupabaseProvider>
      </body>
    </html>
  );
}

