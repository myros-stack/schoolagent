import { NextResponse } from "next/server";
import { listSchoolEmails } from "@/lib/google";
import { createRouteSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createRouteSupabaseClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const emails = await listSchoolEmails({ maxResults: 10 });
  return NextResponse.json({ emails });
}

