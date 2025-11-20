import { NextResponse } from "next/server";
import { z } from "zod";
import { insertCalendarEvents } from "@/lib/google";
import { createRouteSupabaseClient } from "@/lib/supabase/server";

const bodySchema = z.object({
  events: z
    .array(
      z.object({
        title: z.string(),
        description: z.string().optional(),
        startsAt: z.string(),
        endsAt: z.string().optional(),
        location: z.string().optional()
      })
    )
    .min(1)
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

  const created = await insertCalendarEvents(payload.events);
  return NextResponse.json({ events: created });
}

