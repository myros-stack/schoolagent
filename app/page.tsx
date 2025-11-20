import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/landing/hero";
import { FeatureGrid } from "@/components/landing/feature-grid";
import { Workflow } from "@/components/landing/workflow";
import { CtaSection } from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-gradient-to-b from-white to-slate-50">
        <Hero />
        <FeatureGrid />
        <Workflow />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}

