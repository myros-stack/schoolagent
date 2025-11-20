const steps = [
  {
    step: "01",
    title: "Connect Gmail & Calendar",
    description:
      "Secure OAuth flow stores tokens in Supabase. Choose which labels or senders to monitor."
  },
  {
    step: "02",
    title: "Ingest & parse",
    description:
      "Gemini reads email bodies, attachments, and uploaded PDFs to extract to-dos and events."
  },
  {
    step: "03",
    title: "Review dashboard",
    description:
      "Parents review generated tasks/events, map them to children, and fine-tune before approval."
  },
  {
    step: "04",
    title: "Sync everywhere",
    description:
      "Approved tasks sync to Google Calendar and Supabase. Completed items stay archived for audit."
  }
];

export function Workflow() {
  return (
    <section id="workflow" className="bg-gradient-to-b from-slate-900 to-slate-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-300">
            Workflow
          </p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">How the agent operates</h2>
          <p className="mt-4 text-slate-200">
            Built with Next.js App Router + Supabase, the agent runs server-side to keep Gmail and
            Calendar tokens secure, while Gemini handles heavy parsing.
          </p>
        </div>
        <ol className="mt-12 space-y-6">
          {steps.map((step) => (
            <li
              key={step.step}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-200">
                {step.step}
              </span>
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="text-slate-200">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

