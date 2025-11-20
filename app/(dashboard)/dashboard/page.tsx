import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ChildCard } from "@/components/dashboard/child-card";
import { TaskList } from "@/components/dashboard/task-list";
import { EventList } from "@/components/dashboard/event-list";
import { UploadPanel } from "@/components/dashboard/upload-panel";
import { ChildProfileForm } from "@/components/forms/child-profile-form";
import type { TaskItem, EventItem } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const [childrenRes, tasksRes, eventsRes] = await Promise.all([
    supabase.from("children").select("*").eq("parent_id", session.user.id).order("created_at"),
    supabase
      .from("tasks")
      .select("*")
      .eq("parent_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(15),
    supabase
      .from("events")
      .select("*")
      .eq("parent_id", session.user.id)
      .order("created_at", { ascending: false })
      .limit(15)
  ]);

  const childLookup =
    childrenRes.data?.reduce<Record<string, string>>((acc, child) => {
      acc[child.id] = child.name;
      return acc;
    }, {}) ?? {};

  const tasks: TaskItem[] =
    tasksRes.data?.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      dueAt: task.due_at,
      childName: task.child_id ? childLookup[task.child_id] : undefined,
      status: task.status,
      source: task.source
    })) ?? [];

  const events: EventItem[] =
    eventsRes.data?.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      startsAt: event.starts_at,
      endsAt: event.ends_at ?? undefined,
      location: event.location ?? undefined,
      childName: event.child_id ? childLookup[event.child_id] : undefined,
      source: event.source,
      synced: event.synced_to_calendar
    })) ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-primary-600">Dashboard</p>
          <h1 className="text-3xl font-semibold text-slate-900">Hi, {session.user.email}</h1>
          <p className="text-sm text-slate-600">
            Review new AI-suggested tasks and events, approve what matters, and sync to Google
            Calendar.
          </p>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Tasks</h2>
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  Gemini • Gmail • PDFs
                </span>
              </div>
              <div className="mt-5">
                <TaskList tasks={tasks} />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Events</h2>
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  Google Calendar
                </span>
              </div>
              <div className="mt-5">
                <EventList events={events} />
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-primary-600">Children</p>
                <p className="mt-2 text-sm text-slate-600">
                  Assign tasks and events to kids for better filtering.
                </p>
              </div>
              <div className="space-y-3">
                {(childrenRes.data ?? []).map((child) => (
                  <ChildCard
                    key={child.id}
                    name={child.name}
                    grade={child.grade}
                    homeroom={child.homeroom}
                  />
                ))}
                <ChildProfileForm />
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-primary-600">PDFs</p>
              <p className="mt-2 text-sm text-slate-600">
                Drop attachments like newsletters, supply lists, or permission slips.
              </p>
              <div className="mt-4">
                <UploadPanel />
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

