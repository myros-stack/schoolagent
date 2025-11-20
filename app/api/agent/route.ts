import { NextResponse } from "next/server";
import { z } from "zod";
import { parseSchoolContent } from "@/lib/ai";
import { createRouteSupabaseClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  content: z.string().min(10),
  source: z.enum(["email", "pdf", "manual"]).default("email"),
  childId: z.string().uuid().nullable().optional(),
  context: z.string().optional()
});

export async function POST(request: Request) {
  const supabase = createRouteSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json();
  const payload = bodySchema.parse(json);

  const parsed = await parseSchoolContent({
    content: payload.content,
    context: payload.context
  });

  const taskRows = parsed.tasks.map((task) => ({
    parent_id: session.user.id,
    child_id: payload.childId ?? null,
    title: task.title,
    description: task.description,
    due_at: task.dueAt,
    status: "pending",
    source: payload.source,
    raw_payload: task
  }));

  const eventRows = parsed.events.map((event) => ({
    parent_id: session.user.id,
    child_id: payload.childId ?? null,
    title: event.title,
    description: event.description,
    starts_at: event.startsAt,
    ends_at: event.endsAt,
    location: event.location,
    source: payload.source,
    raw_payload: event
  }));

  if (taskRows.length) {
    await supabase.from("tasks").insert(taskRows);
  }

  if (eventRows.length) {
    await supabase.from("events").insert(eventRows);
  }

  return NextResponse.json(parsed);
}

