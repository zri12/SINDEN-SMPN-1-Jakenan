-- SINDEN 009 - views and reporting helpers
create or replace view public.grade_summary as
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

create or replace view public.assignment_submission_summary as
select
  a.id as assignment_id,
  a.title,
  a.teacher_id,
  a.class_id,
  c.name as class_name,
  a.subject_id,
  sub.name as subject_name,
  count(st.id) filter (where st.status = 'active') as total_students,
  count(sbm.id) as submitted_count,
  count(st.id) filter (where st.status = 'active') - count(sbm.id) as not_submitted_count
from public.assignments a
join public.classes c on c.id = a.class_id
join public.subjects sub on sub.id = a.subject_id
left join public.students st on st.class_id = a.class_id
left join public.submissions sbm on sbm.assignment_id = a.id and sbm.student_id = st.id
group by a.id, a.title, a.teacher_id, a.class_id, c.name, a.subject_id, sub.name;

create or replace view public.dashboard_summary as
select
  (select count(*) from public.students where status = 'active') as total_students,
  (select count(*) from public.teachers where status = 'active') as total_teachers,
  (select count(*) from public.classes where is_active = true) as total_classes,
  (select count(*) from public.subjects where is_active = true) as total_subjects,
  (select count(*) from public.assignments where status = 'active') as active_assignments,
  (select count(*) from public.grades) as total_grades,
  (select coalesce(round(avg(score)::numeric, 2), 0) from public.grades) as average_score;
