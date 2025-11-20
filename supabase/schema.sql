-- Profiles table (one-to-one with auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz default timezone('utc', now())
);

alter table public.profiles enable row level security;
create policy "Profiles are viewable by owner" on public.profiles
  for select using (auth.uid() = id);
create policy "Profiles are insertable by owner" on public.profiles
  for insert with check (auth.uid() = id);
create policy "Profiles are updatable by owner" on public.profiles
  for update using (auth.uid() = id);

-- Children table
create table if not exists public.children (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  grade text,
  homeroom text,
  created_at timestamptz default timezone('utc', now())
);

alter table public.children enable row level security;
create policy "Parents manage their children" on public.children
  using (auth.uid() = parent_id)
  with check (auth.uid() = parent_id);

-- Tasks parsed from emails / PDFs
create type task_source as enum ('email', 'pdf', 'manual');
create type task_status as enum ('pending', 'completed', 'dismissed');

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  child_id uuid references public.children(id) on delete set null,
  title text not null,
  description text,
  due_at timestamptz,
  status task_status default 'pending',
  source task_source default 'email',
  raw_payload jsonb,
  created_at timestamptz default timezone('utc', now())
);

alter table public.tasks enable row level security;
create policy "Parents access their tasks" on public.tasks
  using (auth.uid() = parent_id)
  with check (auth.uid() = parent_id);

-- Events
create type event_source as enum ('email', 'pdf', 'manual');

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  child_id uuid references public.children(id) on delete set null,
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  source event_source default 'email',
  raw_payload jsonb,
  synced_to_calendar boolean default false,
  calendar_event_id text,
  created_at timestamptz default timezone('utc', now())
);

alter table public.events enable row level security;
create policy "Parents access their events" on public.events
  using (auth.uid() = parent_id)
  with check (auth.uid() = parent_id);

-- Documents uploaded/parsed
create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles(id) on delete cascade,
  child_id uuid references public.children(id) on delete set null,
  storage_path text not null,
  filename text not null,
  mime_type text,
  parsed boolean default false,
  created_at timestamptz default timezone('utc', now())
);

alter table public.documents enable row level security;
create policy "Parents access their documents" on public.documents
  using (auth.uid() = parent_id)
  with check (auth.uid() = parent_id);

-- Storage bucket for PDFs
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false)
on conflict (id) do nothing;

