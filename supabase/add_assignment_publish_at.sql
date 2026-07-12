-- Tambahkan jadwal publish tugas.
-- Jalankan di Supabase SQL Editor sebelum memakai fitur publish tugas.

alter table public.assignments
add column if not exists publish_at timestamptz not null default now();

create index if not exists idx_assignments_publish_at on public.assignments(publish_at);
