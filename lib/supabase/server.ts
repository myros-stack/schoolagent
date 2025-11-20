import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/lib/types/database";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function ensureEnv() {
  if (!url || !anonKey) {
    throw new Error("Missing Supabase environment variables");
  }
  return { url, anonKey };
}

function createSupabaseClientForServer() {
  const { url, anonKey } = ensureEnv();
  const cookieStore = cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options?: any) {
        cookieStore.set({ name, value, ...(options ?? {}) });
      },
      remove(name: string, options?: any) {
        cookieStore.delete({ name, ...(options ?? {}) });
      }
    }
  });
}

export function createServerSupabaseClient() {
  return createSupabaseClientForServer();
}

export function createServerActionSupabaseClient() {
  return createSupabaseClientForServer();
}

export function createRouteSupabaseClient() {
  return createSupabaseClientForServer();
}

export function createServiceRoleClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase service role env vars are not set");
  }
  return createClient<Database>(url, key, {
    auth: {
      persistSession: false
    }
  });
}

