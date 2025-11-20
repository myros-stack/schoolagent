import Link from "next/link";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#workflow" },
  { label: "Dashboard", href: "/dashboard" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-semibold text-primary-600">
          SchoolAgent
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-primary-600">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-600"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary-600/30 hover:bg-primary-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}

