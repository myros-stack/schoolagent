"use client";

import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { createBrowserClient, type SupabaseClient } from "@supabase/ssr";
import type { Database } from "@/lib/types/database";

type SupabaseContextValue = {
  supabase: SupabaseClient<Database>;
};

const SupabaseContext = createContext<SupabaseContextValue | undefined>(undefined);

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const [supabaseClient] = useState(() =>
    createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
    )
  );

  const value = useMemo(
    () => ({
      supabase: supabaseClient
    }),
    [supabaseClient]
  );

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>;
}

export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) {
    throw new Error("Supabase hooks must be used inside SupabaseProvider");
  }
  return ctx;
}

