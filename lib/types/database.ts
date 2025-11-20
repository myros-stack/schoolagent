export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          full_name: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          email: string;
          full_name?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          full_name?: string | null;
        };
      };
      children: {
        Row: {
          id: string;
          created_at: string;
          parent_id: string;
          name: string;
          grade: string | null;
          homeroom: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          parent_id: string;
          name: string;
          grade?: string | null;
          homeroom?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          parent_id?: string;
          name?: string;
          grade?: string | null;
          homeroom?: string | null;
        };
      };
      tasks: {
        Row: {
          id: string;
          created_at: string;
          parent_id: string;
          child_id: string | null;
          source: "email" | "pdf" | "manual";
          title: string;
          description: string | null;
          due_at: string | null;
          status: "pending" | "completed" | "dismissed";
          raw_payload: Json | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          parent_id: string;
          child_id?: string | null;
          source: "email" | "pdf" | "manual";
          title: string;
          description?: string | null;
          due_at?: string | null;
          status?: "pending" | "completed" | "dismissed";
          raw_payload?: Json | null;
        };
        Update: Partial<Database["public"]["Tables"]["tasks"]["Row"]>;
      };
      events: {
        Row: {
          id: string;
          created_at: string;
          parent_id: string;
          child_id: string | null;
          title: string;
          description: string | null;
          starts_at: string;
          ends_at: string | null;
          location: string | null;
          source: "email" | "pdf" | "manual";
          raw_payload: Json | null;
          synced_to_calendar: boolean;
          calendar_event_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          parent_id: string;
          child_id?: string | null;
          title: string;
          description?: string | null;
          starts_at: string;
          ends_at?: string | null;
          location?: string | null;
          source: "email" | "pdf" | "manual";
          raw_payload?: Json | null;
          synced_to_calendar?: boolean;
          calendar_event_id?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["events"]["Row"]>;
      };
      documents: {
        Row: {
          id: string;
          parent_id: string;
          child_id: string | null;
          storage_path: string;
          filename: string;
          mime_type: string | null;
          parsed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          parent_id: string;
          child_id?: string | null;
          storage_path: string;
          filename: string;
          mime_type?: string | null;
          parsed?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["documents"]["Row"]>;
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

