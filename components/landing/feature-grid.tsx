const features = [
  {
    title: "Email intelligence",
    description: "Securely connect Gmail. We classify school senders and parse key instructions.",
    bullets: ["OAuth with Google", "Gemini summarization", "One-click triage"]
  },
  {
    title: "Calendar superpowers",
    description: "Propose events to Google Calendar with start/end times, reminders, and locations.",
    bullets: ["Conflict detection", "Child-specific calendars", "Manual edits before sync"]
  },
  {
    title: "PDF + attachment parsing",
    description: "Drop class newsletters, supply lists, and permission slips—our AI extracts actions.",
    bullets: ["Supabase Storage", "OCR fallback", "Version history"]
  },
  {
    title: "Family dashboard",
    description: "See every child, every task, and every event in one dashboard with filtering.",
    bullets: ["Child profiles", "Status tracking", "Inline approvals"]
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="border-t border-slate-100 bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            Powerful agent workflow
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Everything school-related, centralized
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            SchoolAgent orchestrates the entire pipeline—from Gmail to Gemini to Supabase to Google
            Calendar—so you can trust the AI but keep final approval.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-slate-100 bg-slate-50/50 p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{feature.description}</p>
              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary-500" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

