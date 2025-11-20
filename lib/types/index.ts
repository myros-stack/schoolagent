export type SourceType = "email" | "pdf" | "manual";

export type TaskStatus = "pending" | "completed" | "dismissed";

export type TaskItem = {
  id: string;
  title: string;
  description?: string | null;
  dueAt?: string | null;
  childName?: string | null;
  status: TaskStatus;
  source: SourceType;
};

export type EventItem = {
  id: string;
  title: string;
  description?: string | null;
  startsAt: string;
  endsAt?: string | null;
  location?: string | null;
  childName?: string | null;
  source: SourceType;
  synced?: boolean;
};

export type ParsedAgentResult = {
  tasks: TaskItem[];
  events: EventItem[];
  insights?: string[];
};

