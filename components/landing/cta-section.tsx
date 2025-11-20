import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl rounded-4xl border border-slate-100 bg-slate-900 px-8 py-14 text-center text-white shadow-2xl shadow-slate-900/30">
        <p className="text-sm uppercase tracking-[0.2em] text-primary-200">Ready in minutes</p>
        <h2 className="mt-4 text-3xl font-semibold">Parents stay ahead. Kids stay prepared.</h2>
        <p className="mt-4 text-lg text-slate-300">
          Connect Gmail, review AI-generated tasks, and sync to Google Calendar—all from one
          dashboard, backed by Supabase and Gemini.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-white/30 transition hover:-translate-y-0.5"
          >
            Create my account
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full border border-white/40 px-8 py-3 text-sm font-semibold text-white transition hover:border-white hover:text-white"
          >
            View dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

