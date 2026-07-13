-- SINDEN 008 - reporting views and helper functions

drop view if exists public.teacher_submission_status_view cascade;
drop view if exists public.student_assignment_status_view cascade;
drop view if exists public.student_grade_summary cascade;
drop view if exists public.assignment_submission_summary cascade;
drop view if exists public.classes_with_student_count cascade;
drop view if exists public.dashboard_summary cascade;
drop view if exists public.grade_summary cascade;

create or replace view public.classes_with_student_count
with (security_invoker = true)
as
select
  c.id as class_id,
  c.name as class_name,
  c.grade_level,
  c.academic_year,
  count(s.id) filter (where s.status = 'active')::integer as student_count
from public.classes c
left join public.students s on s.class_id = c.id
group by c.id, c.name, c.grade_level, c.academic_year;

create or replace view public.assignment_submission_summary
with (security_invoker = true)
as
select
  a.id as assignment_id,
  a.title,
  a.class_id,
  c.name as class_name,
  a.subject_id,
  sub.name as subject_name,
  a.teacher_id,
  count(st.id) filter (where st.status = 'active')::integer as total_students,
  count(sbm.id)::integer as submitted_count,
  (count(st.id) filter (where st.status = 'active') - count(sbm.id))::integer as not_submitted_count,
  count(sbm.id) filter (where sbm.status = 'reviewed')::integer as reviewed_count,
  count(sbm.id) filter (where sbm.status = 'late')::integer as late_count
from public.assignments a
join public.classes c on c.id = a.class_id
join public.subjects sub on sub.id = a.subject_id
left join public.students st on st.class_id = a.class_id and st.status = 'active'
left join public.submissions sbm on sbm.assignment_id = a.id and sbm.student_id = st.id
group by a.id, a.title, a.class_id, c.name, a.subject_id, sub.name, a.teacher_id;

create or replace view public.student_grade_summary
with (security_invoker = true)
as
select
  s.id as student_id,
  s.full_name as student_name,
  c.id as class_id,
  c.name as class_name,
  coalesce(round(avg(g.score)::numeric, 2), 0) as average_score,
  count(g.id)::integer as total_grades,
  count(g.id) filter (where g.score >= g.kkm)::integer as passed_count,
  count(g.id) filter (where g.score < g.kkm)::integer as failed_count
from public.students s
left join public.classes c on c.id = s.class_id
left join public.grades g on g.student_id = s.id
group by s.id, s.full_name, c.id, c.name;

create or replace view public.student_assignment_status_view
with (security_invoker = true)
as
select
  a.id as assignment_id,
  a.title,
  a.class_id,
  sub.name as subject_name,
  a.deadline,
  a.publish_at,
  a.status as assignment_status,
  sbm.id as submission_id,
  coalesce(sbm.status, 'not_submitted') as submission_status,
  sbm.submitted_at,
  g.score
from public.assignments a
join public.subjects sub on sub.id = a.subject_id
join public.students st on st.class_id = a.class_id
left join public.submissions sbm on sbm.assignment_id = a.id and sbm.student_id = st.id
left join public.grades g on g.submission_id = sbm.id
where st.id = public.get_current_student_id();

create or replace view public.teacher_submission_status_view
with (security_invoker = true)
as
select
  a.id as assignment_id,
  a.title,
  a.teacher_id,
  a.class_id,
  a.subject_id,
  sub.name as subject_name,
  sub.kkm,
  st.id as student_id,
  st.full_name as student_name,
  c.name as class_name,
  sbm.id as submission_id,
  coalesce(sbm.status, 'not_submitted') as submission_status,
  sbm.submitted_at,
  sbm.submission_file_url,
  sbm.submission_file_path,
  sbm.submission_link_url,
  sbm.note,
  g.score,
  g.id as grade_id,
  case when sbm.id is null then 'Belum Mengumpulkan' else 'Sudah Mengumpulkan' end as status_pengumpulan
from public.assignments a
join public.classes c on c.id = a.class_id
join public.subjects sub on sub.id = a.subject_id
join public.students st on st.class_id = a.class_id and st.status = 'active'
left join public.submissions sbm on sbm.assignment_id = a.id and sbm.student_id = st.id
left join public.grades g on g.submission_id = sbm.id
where a.teacher_id = public.get_current_teacher_id() or public.is_admin();

create or replace view public.grade_summary
with (security_invoker = true)
as
select
  g.student_id,
  s.full_name as student_name,
  c.id as class_id,
  c.name as class_name,
  sub.id as subject_id,
  sub.name as subject_name,
  g.academic_year,
  g.semester,
  round(avg(g.score)::numeric, 2) as average_score,
  max(g.kkm) as kkm,
  case when avg(g.score) >= max(g.kkm) then 'Tuntas' else 'Belum Tuntas' end as status
from public.grades g
join public.students s on s.id = g.student_id
left join public.classes c on c.id = g.class_id
left join public.subjects sub on sub.id = g.subject_id
group by g.student_id, s.full_name, c.id, c.name, sub.id, sub.name, g.academic_year, g.semester;

create or replace view public.dashboard_summary
with (security_invoker = true)
as
select
  (select count(*) from public.students where status = 'active')::integer as total_students,
  (select count(*) from public.teachers where status = 'active')::integer as total_teachers,
  (select count(*) from public.classes where is_active = true)::integer as total_classes,
  (select count(*) from public.subjects where is_active = true)::integer as total_subjects,
  (select count(*) from public.assignments where status = 'active')::integer as active_assignments,
  (select count(*) from public.grades)::integer as total_grades,
  (select coalesce(round(avg(score)::numeric, 2), 0) from public.grades) as average_score;
