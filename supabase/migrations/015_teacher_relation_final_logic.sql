-- Final teacher/class/subject relation logic.
-- Teacher relations are managed by admin only. Student count is calculated
-- from active students, not edited manually on classes.

drop policy if exists "classes_teacher_select_active" on public.classes;
drop policy if exists "subjects_teacher_select_active" on public.subjects;
drop policy if exists "teacher_classes_teacher_insert_own" on public.teacher_classes;
drop policy if exists "teacher_classes_teacher_update_own" on public.teacher_classes;
drop policy if exists "teacher_classes_teacher_delete_own" on public.teacher_classes;

drop view if exists public.classes_with_student_count cascade;
alter table public.classes drop column if exists student_count;

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
  count(s.id) filter (where s.status = 'active')::integer as student_count
from public.classes c
left join public.students s on s.class_id = c.id
group by c.id, c.name, c.grade_level, c.academic_year;

drop view if exists public.teacher_teaching_relations cascade;
create or replace view public.teacher_teaching_relations
with (security_invoker = true)
as
select
  tc.id,
  tc.teacher_id,
  tc.class_id,
  c.name as class_name,
  tc.subject_id,
  s.name as subject_name,
  tc.academic_year,
  tc.semester,
  count(st.id) filter (where st.status = 'active')::integer as student_count
from public.teacher_classes tc
join public.classes c on c.id = tc.class_id
join public.subjects s on s.id = tc.subject_id
left join public.students st on st.class_id = tc.class_id
group by tc.id, tc.teacher_id, tc.class_id, c.name, tc.subject_id, s.name, tc.academic_year, tc.semester;

drop view if exists public.assignment_submission_summary cascade;
create or replace view public.assignment_submission_summary
with (security_invoker = true)
as
select
  a.id as assignment_id,
  a.teacher_id,
  a.class_id,
  a.subject_id,
  count(st.id) filter (where st.status = 'active')::integer as total_students,
  count(sub.id) filter (where sub.id is not null)::integer as submitted_count,
  (count(st.id) filter (where st.status = 'active') - count(sub.id) filter (where sub.id is not null))::integer as not_submitted_count,
  count(sub.id) filter (where sub.submitted_at > a.deadline)::integer as late_count,
  count(sub.id) filter (where sub.status = 'reviewed')::integer as reviewed_count
from public.assignments a
left join public.students st on st.class_id = a.class_id and st.status = 'active'
left join public.submissions sub on sub.assignment_id = a.id and sub.student_id = st.id
group by a.id, a.teacher_id, a.class_id, a.subject_id;

drop view if exists public.teacher_submission_status_view cascade;
create or replace view public.teacher_submission_status_view
with (security_invoker = true)
as
select
  a.id as assignment_id,
  a.title,
  a.teacher_id,
  a.class_id,
  c.name as class_name,
  a.subject_id,
  subj.name as subject_name,
  subj.kkm,
  st.id as student_id,
  st.full_name as student_name,
  st.nisn,
  sub.id as submission_id,
  sub.submission_file_url,
  sub.submission_file_path,
  sub.submission_link_url,
  sub.status as submission_status,
  sub.submitted_at,
  sub.note,
  g.id as grade_id,
  g.score,
  case
    when g.id is not null or sub.status = 'reviewed' then 'reviewed'
    when sub.id is null then 'not_submitted'
    when a.deadline is not null and sub.submitted_at > a.deadline then 'late'
    else 'submitted'
  end as final_status
from public.assignments a
join public.classes c on c.id = a.class_id
join public.subjects subj on subj.id = a.subject_id
join public.students st on st.class_id = a.class_id and st.status = 'active'
left join public.submissions sub on sub.assignment_id = a.id and sub.student_id = st.id
left join public.grades g on g.assignment_id = a.id and g.student_id = st.id;
