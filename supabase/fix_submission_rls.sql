-- Fix RLS pengumpulan tugas siswa.
-- Jalankan di Supabase SQL Editor kalau submit tugas muncul:
-- "new row violates row-level security policy".

alter table public.assignments
add column if not exists publish_at timestamptz not null default now();

drop policy if exists "submissions_student_insert" on public.submissions;
create policy "submissions_student_insert" on public.submissions
for insert
with check (
  student_id = public.get_current_student_id()
  and exists (
    select 1
    from public.assignments a
    join public.students s on s.id = public.get_current_student_id()
    where a.id = submissions.assignment_id
      and a.class_id = s.class_id
      and a.status = 'active'
      and coalesce(a.publish_at, a.created_at) <= now()
      and (a.deadline is null or a.deadline >= now())
  )
);

drop policy if exists "submissions_student_update" on public.submissions;
create policy "submissions_student_update" on public.submissions
for update
using (
  student_id = public.get_current_student_id()
)
with check (
  student_id = public.get_current_student_id()
  and exists (
    select 1
    from public.assignments a
    join public.students s on s.id = public.get_current_student_id()
    where a.id = submissions.assignment_id
      and a.class_id = s.class_id
      and a.status = 'active'
      and coalesce(a.publish_at, a.created_at) <= now()
      and (a.deadline is null or a.deadline >= now())
  )
);
