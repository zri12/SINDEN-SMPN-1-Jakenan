-- SINDEN 012 - public settings and non-recursive RLS helpers.

grant usage on schema public to anon, authenticated;
grant select on table public.settings to anon, authenticated;

drop policy if exists "settings_select_authenticated" on public.settings;
create policy "settings_select_public" on public.settings
for select using (true);

create or replace function public.get_current_student_class_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.class_id
  from public.students s
  where s.profile_id = auth.uid()
  limit 1
$$;

create or replace function public.current_teacher_can_access_class(target_class_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.teacher_classes tc
    join public.teachers t on t.id = tc.teacher_id
    where t.profile_id = auth.uid()
      and tc.class_id = target_class_id
  )
$$;

create or replace function public.current_teacher_can_access_class_subject(target_class_id uuid, target_subject_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.teacher_classes tc
    join public.teachers t on t.id = tc.teacher_id
    where t.profile_id = auth.uid()
      and tc.class_id = target_class_id
      and tc.subject_id = target_subject_id
  )
$$;

create or replace function public.teacher_teaches_student_class(target_teacher_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.teacher_classes tc
    join public.students s on s.class_id = tc.class_id
    where tc.teacher_id = target_teacher_id
      and s.profile_id = auth.uid()
  )
$$;

create or replace function public.current_teacher_owns_assignment(target_assignment_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.assignments a
    join public.teachers t on t.id = a.teacher_id
    where a.id = target_assignment_id
      and t.profile_id = auth.uid()
  )
$$;

drop policy if exists "classes_select_by_role" on public.classes;
create policy "classes_select_by_role" on public.classes
for select using (
  public.is_admin()
  or public.current_teacher_can_access_class(id)
  or id = public.get_current_student_class_id()
);

drop policy if exists "students_select_by_role" on public.students;
create policy "students_select_by_role" on public.students
for select using (
  public.is_admin()
  or profile_id = auth.uid()
  or public.current_teacher_can_access_class(class_id)
);

drop policy if exists "teachers_select_by_role" on public.teachers;
create policy "teachers_select_by_role" on public.teachers
for select using (
  public.is_admin()
  or profile_id = auth.uid()
  or public.teacher_teaches_student_class(id)
);

drop policy if exists "teacher_classes_select_by_role" on public.teacher_classes;
create policy "teacher_classes_select_by_role" on public.teacher_classes
for select using (
  public.is_admin()
  or teacher_id = public.get_current_teacher_id()
  or class_id = public.get_current_student_class_id()
);

drop policy if exists "assignments_select_by_role" on public.assignments;
create policy "assignments_select_by_role" on public.assignments
for select using (
  public.is_admin()
  or teacher_id = public.get_current_teacher_id()
  or class_id = public.get_current_student_class_id()
);

drop policy if exists "submissions_select_by_role" on public.submissions;
create policy "submissions_select_by_role" on public.submissions
for select using (
  public.is_admin()
  or student_id = public.get_current_student_id()
  or public.current_teacher_owns_assignment(assignment_id)
);

drop policy if exists "grades_select_by_role" on public.grades;
create policy "grades_select_by_role" on public.grades
for select using (
  public.is_admin()
  or student_id = public.get_current_student_id()
  or teacher_id = public.get_current_teacher_id()
  or public.current_teacher_can_access_class_subject(class_id, subject_id)
);

drop policy if exists "announcements_select_by_role" on public.announcements;
create policy "announcements_select_by_role" on public.announcements
for select using (
  is_active = true and (
    public.is_admin()
    or target_role = 'all'
    or target_role = public.get_current_profile_role()
    or (
      public.is_student()
      and target_role = 'student'
      and (class_id is null or class_id = public.get_current_student_class_id())
    )
  )
);

grant execute on all functions in schema public to anon, authenticated;
