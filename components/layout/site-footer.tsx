import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SchoolAgent. Built for busy parents.</p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-primary-600">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-primary-600">
            Terms
          </Link>
          <Link href="/support" className="hover:text-primary-600">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}

