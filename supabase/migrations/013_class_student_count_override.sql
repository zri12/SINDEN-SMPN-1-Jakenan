-- Add editable student count to classes.
-- The value remains editable from Data Kelas. Reporting still falls back to
-- counting active students if student_count is null.

alter table public.classes add column if not exists student_count integer not null default 0;

drop view if exists public.classes_with_student_count cascade;

create or replace view public.classes_with_student_count
with (security_invoker = true)
as
select
  c.id,
  c.id as class_id,
  c.name,
  c.name as class_name,
  c.grade_level,
  c.academic_year,
  coalesce(c.student_count, count(s.id) filter (where s.status = 'active')::integer, 0) as student_count
from public.classes c
left join public.students s on s.class_id = c.id
group by c.id, c.name, c.grade_level, c.academic_year, c.student_count;
