-- SINDEN 005 - RLS policies

create or replace function public.get_current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.role
  from public.profiles p
  where p.id = auth.uid() and p.is_active = true
  limit 1
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.get_current_profile_role() = 'admin', false)
$$;

create or replace function public.is_teacher()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.get_current_profile_role() = 'teacher', false)
$$;

create or replace function public.is_student()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.get_current_profile_role() = 'student', false)
$$;

create or replace function public.get_current_teacher_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select t.id
  from public.teachers t
  where t.profile_id = auth.uid()
  limit 1
$$;

create or replace function public.get_current_student_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.id
  from public.students s
  where s.profile_id = auth.uid()
  limit 1
$$;

-- profiles
create policy "profiles_select_own_or_admin" on public.profiles
for select using (id = auth.uid() or public.is_admin());

create policy "profiles_admin_insert" on public.profiles
for insert with check (public.is_admin());

create policy "profiles_admin_update" on public.profiles
for update using (public.is_admin()) with check (public.is_admin());

create policy "profiles_update_own_safe" on public.profiles
for update using (id = auth.uid()) with check (id = auth.uid() and role = public.get_current_profile_role());

create policy "profiles_admin_delete" on public.profiles
for delete using (public.is_admin());

-- classes
create policy "classes_select_by_role" on public.classes
for select using (
  public.is_admin()
  or exists (
    select 1 from public.teacher_classes tc
    where tc.class_id = classes.id and tc.teacher_id = public.get_current_teacher_id()
  )
  or exists (
    select 1 from public.students s
    where s.class_id = classes.id and s.id = public.get_current_student_id()
  )
);

create policy "classes_admin_insert" on public.classes for insert with check (public.is_admin());
create policy "classes_admin_update" on public.classes for update using (public.is_admin()) with check (public.is_admin());
create policy "classes_admin_delete" on public.classes for delete using (public.is_admin());

-- subjects
create policy "subjects_select_authenticated" on public.subjects
for select using (auth.uid() is not null);

create policy "subjects_admin_insert" on public.subjects for insert with check (public.is_admin());
create policy "subjects_admin_update" on public.subjects for update using (public.is_admin()) with check (public.is_admin());
create policy "subjects_admin_delete" on public.subjects for delete using (public.is_admin());

-- students
create policy "students_select_by_role" on public.students
for select using (
  public.is_admin()
  or id = public.get_current_student_id()
  or exists (
    select 1 from public.teacher_classes tc
    where tc.class_id = students.class_id and tc.teacher_id = public.get_current_teacher_id()
  )
);

create policy "students_admin_insert" on public.students for insert with check (public.is_admin());
create policy "students_admin_update" on public.students for update using (public.is_admin()) with check (public.is_admin());
create policy "students_admin_delete" on public.students for delete using (public.is_admin());

-- teachers
create policy "teachers_select_by_role" on public.teachers
for select using (
  public.is_admin()
  or id = public.get_current_teacher_id()
  or exists (
    select 1
    from public.teacher_classes tc
    join public.students s on s.class_id = tc.class_id
    where tc.teacher_id = teachers.id and s.id = public.get_current_student_id()
  )
);

create policy "teachers_admin_insert" on public.teachers for insert with check (public.is_admin());
create policy "teachers_admin_update" on public.teachers for update using (public.is_admin()) with check (public.is_admin());
create policy "teachers_update_own" on public.teachers
for update using (id = public.get_current_teacher_id()) with check (id = public.get_current_teacher_id());
create policy "teachers_admin_delete" on public.teachers for delete using (public.is_admin());

-- teacher_classes
create policy "teacher_classes_select_by_role" on public.teacher_classes
for select using (
  public.is_admin()
  or teacher_id = public.get_current_teacher_id()
  or exists (
    select 1 from public.students s
    where s.class_id = teacher_classes.class_id and s.id = public.get_current_student_id()
  )
);

create policy "teacher_classes_admin_insert" on public.teacher_classes for insert with check (public.is_admin());
create policy "teacher_classes_admin_update" on public.teacher_classes for update using (public.is_admin()) with check (public.is_admin());
create policy "teacher_classes_admin_delete" on public.teacher_classes for delete using (public.is_admin());

-- assignments
create policy "assignments_select_by_role" on public.assignments
for select using (
  public.is_admin()
  or teacher_id = public.get_current_teacher_id()
  or exists (
    select 1 from public.students s
    where s.class_id = assignments.class_id and s.id = public.get_current_student_id()
  )
);

create policy "assignments_teacher_insert" on public.assignments
for insert with check (
  public.is_admin()
  or (
    teacher_id = public.get_current_teacher_id()
    and exists (
      select 1 from public.teacher_classes tc
      where tc.teacher_id = assignments.teacher_id
        and tc.class_id = assignments.class_id
        and tc.subject_id = assignments.subject_id
    )
  )
);

create policy "assignments_teacher_update" on public.assignments
for update using (public.is_admin() or teacher_id = public.get_current_teacher_id())
with check (public.is_admin() or teacher_id = public.get_current_teacher_id());

create policy "assignments_teacher_delete" on public.assignments
for delete using (public.is_admin() or teacher_id = public.get_current_teacher_id());

-- submissions
create policy "submissions_select_by_role" on public.submissions
for select using (
  public.is_admin()
  or student_id = public.get_current_student_id()
  or exists (
    select 1 from public.assignments a
    where a.id = submissions.assignment_id and a.teacher_id = public.get_current_teacher_id()
  )
);

create policy "submissions_student_insert" on public.submissions
for insert with check (
  student_id = public.get_current_student_id()
  and exists (
    select 1
    from public.assignments a
    join public.students s on s.id = public.get_current_student_id()
    where a.id = submissions.assignment_id
      and a.class_id = s.class_id
      and a.status = 'active'
  )
);

create policy "submissions_student_update" on public.submissions
for update using (student_id = public.get_current_student_id())
with check (student_id = public.get_current_student_id());

create policy "submissions_admin_update" on public.submissions
for update using (public.is_admin()) with check (public.is_admin());

create policy "submissions_admin_delete" on public.submissions
for delete using (public.is_admin());

-- grades
create policy "grades_select_by_role" on public.grades
for select using (
  public.is_admin()
  or student_id = public.get_current_student_id()
  or teacher_id = public.get_current_teacher_id()
  or exists (
    select 1 from public.teacher_classes tc
    where tc.teacher_id = public.get_current_teacher_id()
      and tc.class_id = grades.class_id
      and tc.subject_id = grades.subject_id
  )
);

create policy "grades_teacher_insert" on public.grades
for insert with check (
  public.is_admin()
  or (
    teacher_id = public.get_current_teacher_id()
    and exists (
      select 1 from public.teacher_classes tc
      where tc.teacher_id = grades.teacher_id
        and tc.class_id = grades.class_id
        and tc.subject_id = grades.subject_id
        and tc.academic_year = grades.academic_year
        and tc.semester = grades.semester
    )
  )
);

create policy "grades_teacher_update" on public.grades
for update using (public.is_admin() or teacher_id = public.get_current_teacher_id())
with check (public.is_admin() or teacher_id = public.get_current_teacher_id());

create policy "grades_admin_delete" on public.grades for delete using (public.is_admin());

-- announcements
create policy "announcements_select_by_role" on public.announcements
for select using (
  is_active = true and (
    target_role = 'all'
    or target_role = public.get_current_profile_role()
    or public.is_admin()
    or (
      public.is_student()
      and target_role = 'student'
      and (
        class_id is null
        or exists (
          select 1 from public.students s
          where s.id = public.get_current_student_id() and s.class_id = announcements.class_id
        )
      )
    )
  )
);

create policy "announcements_admin_insert" on public.announcements for insert with check (public.is_admin());
create policy "announcements_admin_update" on public.announcements for update using (public.is_admin()) with check (public.is_admin());
create policy "announcements_admin_delete" on public.announcements for delete using (public.is_admin());

-- settings
create policy "settings_select_authenticated" on public.settings
for select using (auth.uid() is not null);
create policy "settings_admin_insert" on public.settings for insert with check (public.is_admin());
create policy "settings_admin_update" on public.settings for update using (public.is_admin()) with check (public.is_admin());
create policy "settings_admin_delete" on public.settings for delete using (public.is_admin());

-- activity logs
create policy "activity_logs_admin_select" on public.activity_logs for select using (public.is_admin());
create policy "activity_logs_authenticated_insert" on public.activity_logs
for insert with check (actor_id = auth.uid() or public.is_admin());
