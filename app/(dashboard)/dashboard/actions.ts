'use server';

import { revalidatePath } from "next/cache";
import { createServerActionSupabaseClient } from "@/lib/supabase/server";
import { insertCalendarEvents } from "@/lib/google";
import type { TaskStatus } from "@/lib/types";

export async function updateTaskStatus(formData: FormData) {
  const taskId = formData.get("taskId")?.toString();
  const status = formData.get("status")?.toString() as TaskStatus | undefined;
  if (!taskId || !status) {
    throw new Error("Missing task payload");
  }

  const supabase = createServerActionSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await supabase.from("tasks").update({ status }).eq("id", taskId).eq("parent_id", session.user.id);
  revalidatePath("/dashboard");
}

export async function createChildProfile(formData: FormData) {
  const name = formData.get("name")?.toString();
  const grade = formData.get("grade")?.toString() ?? null;
  const homeroom = formData.get("homeroom")?.toString() ?? null;
  if (!name) {
    throw new Error("Name is required");
  }

  const supabase = createServerActionSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  await supabase.from("children").insert({
    parent_id: session.user.id,
    name,
    grade,
    homeroom
  });

  revalidatePath("/dashboard");
}

export async function syncEventToCalendar(formData: FormData) {
  const eventId = formData.get("eventId")?.toString();
  if (!eventId) {
    throw new Error("Missing event id");
  }

  const supabase = createServerActionSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", eventId)
    .eq("parent_id", session.user.id)
    .single();

  if (!event) {
    throw new Error("Event not found");
  }

  const calendarEvents = await insertCalendarEvents([
    {
      title: event.title,
      description: event.description,
      startsAt: event.starts_at,
      endsAt: event.ends_at ?? undefined,
      location: event.location ?? undefined
    }
  ]);

  await supabase
    .from("events")
    .update({
      synced_to_calendar: true,
      calendar_event_id: calendarEvents[0]?.id ?? null
    })
    .eq("id", event.id);

  revalidatePath("/dashboard");
}

