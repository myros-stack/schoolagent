import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            New • AI agent for parents
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Streamline all your school communications with AI
          </h1>
          <p className="text-lg text-slate-600">
            SchoolAgent connects to Gmail, Google Calendar, and Supabase to read emails, parse PDFs,
            build to-dos, and schedule events for every child—before you miss the next field trip.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/40 transition hover:bg-primary-700"
            >
              Get started free
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-primary-300 hover:text-primary-700"
            >
              Explore features
            </Link>
          </div>
          <dl className="grid gap-6 sm:grid-cols-3">
            {[
              { label: "Emails parsed", value: "12k+" },
              { label: "Events synced", value: "4.2k" },
              { label: "Avg. time saved", value: "5 hrs/week" }
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</dt>
                <dd className="text-xl font-semibold text-slate-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl shadow-primary-900/10">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-medium text-slate-600">Unread school emails</p>
                  <p className="text-2xl font-semibold text-slate-900">28</p>
                </div>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                  Inbox zero ETA 2m
                </span>
              </div>
              <div className="rounded-2xl border border-slate-100 p-4">
                <p className="text-xs uppercase text-slate-500">Next up</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>Field trip form due Friday • Madison</li>
                  <li>PTA meeting added to Google Calendar • 6:30pm</li>
                  <li>Spirit week outfits reminder • Entire school</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-primary-600/5 p-4 text-sm text-primary-900">
                Gemini-powered AI extracts key actions from every email, PDF, and calendar invite so
                you approve before syncing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

