import { NextResponse } from "next/server";
import { z } from "zod";
import { randomUUID } from "crypto";
import { Buffer } from "node:buffer";
import { STORAGE_BUCKET } from "@/lib/constants";
import { createRouteSupabaseClient, createServiceRoleClient } from "@/lib/supabase/server";
import { parseSchoolContent } from "@/lib/ai";

const SUPPORTED_TYPES = ["application/pdf"];

export async function POST(request: Request) {
  const supabase = createRouteSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!SUPPORTED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only PDF uploads are supported" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const path = `${session.user.id}/${randomUUID()}-${file.name}`;

  const serviceClient = createServiceRoleClient();
  await serviceClient.storage.from(STORAGE_BUCKET).upload(path, buffer, {
    contentType: file.type,
    upsert: false
  });

  await serviceClient.from("documents").insert({
    parent_id: session.user.id,
    storage_path: path,
    filename: file.name,
    mime_type: file.type,
    parsed: false
  });

  const text = await file.text();
  const parsed = await parseSchoolContent({
    content: text,
    context: `File name:${file.name}`
  });

  if (parsed.tasks.length) {
    await serviceClient.from("tasks").insert(
      parsed.tasks.map((task) => ({
        parent_id: session.user.id,
        title: task.title,
        description: task.description,
        due_at: task.dueAt,
        source: "pdf",
        raw_payload: task
      }))
    );
  }

  if (parsed.events.length) {
    await serviceClient.from("events").insert(
      parsed.events.map((event) => ({
        parent_id: session.user.id,
        title: event.title,
        description: event.description,
        starts_at: event.startsAt,
        ends_at: event.endsAt,
        location: event.location,
        source: "pdf",
        raw_payload: event
      }))
    );
  }

  return NextResponse.json({ ok: true, tasks: parsed.tasks.length, events: parsed.events.length });
}

