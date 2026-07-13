-- SINDEN 005 - helper functions and Row Level Security policies

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

create or replace function public.current_student_class_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select s.class_id
  from public.students s
  where s.id = public.get_current_student_id()
  limit 1
$$;

create or replace function public.teacher_teaches_class_subject(p_teacher_id uuid, p_class_id uuid, p_subject_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.teacher_classes tc
    where tc.teacher_id = p_teacher_id
      and tc.class_id = p_class_id
      and tc.subject_id = p_subject_id
  )
$$;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
drop policy if exists "profiles_admin_insert" on public.profiles;
drop policy if exists "profiles_admin_update" on public.profiles;
drop policy if exists "profiles_update_own_safe" on public.profiles;
drop policy if exists "profiles_admin_delete" on public.profiles;

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

drop policy if exists "classes_select_by_role" on public.classes;
drop policy if exists "classes_admin_insert" on public.classes;
drop policy if exists "classes_admin_update" on public.classes;
drop policy if exists "classes_admin_delete" on public.classes;

create policy "classes_select_by_role" on public.classes
for select using (
  public.is_admin()
  or exists (
    select 1 from public.teacher_classes tc
    where tc.class_id = classes.id and tc.teacher_id = public.get_current_teacher_id()
  )
  or classes.id = public.current_student_class_id()
);

create policy "classes_admin_insert" on public.classes for insert with check (public.is_admin());
create policy "classes_admin_update" on public.classes for update using (public.is_admin()) with check (public.is_admin());
create policy "classes_admin_delete" on public.classes for delete using (public.is_admin());

drop policy if exists "subjects_select_by_role" on public.subjects;
drop policy if exists "subjects_select_authenticated" on public.subjects;
drop policy if exists "subjects_admin_insert" on public.subjects;
drop policy if exists "subjects_admin_update" on public.subjects;
drop policy if exists "subjects_admin_delete" on public.subjects;

create policy "subjects_select_by_role" on public.subjects
for select using (
  public.is_admin()
  or (public.is_student() and is_active = true)
  or exists (
    select 1 from public.teacher_classes tc
    where tc.subject_id = subjects.id and tc.teacher_id = public.get_current_teacher_id()
  )
);

create policy "subjects_admin_insert" on public.subjects for insert with check (public.is_admin());
create policy "subjects_admin_update" on public.subjects for update using (public.is_admin()) with check (public.is_admin());
create policy "subjects_admin_delete" on public.subjects for delete using (public.is_admin());

drop policy if exists "students_select_by_role" on public.students;
drop policy if exists "students_admin_insert" on public.students;
drop policy if exists "students_admin_update" on public.students;
drop policy if exists "students_admin_delete" on public.students;

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

drop policy if exists "teachers_select_by_role" on public.teachers;
drop policy if exists "teachers_admin_insert" on public.teachers;
drop policy if exists "teachers_admin_update" on public.teachers;
drop policy if exists "teachers_update_own" on public.teachers;
drop policy if exists "teachers_admin_delete" on public.teachers;

create policy "teachers_select_by_role" on public.teachers
for select using (
  public.is_admin()
  or id = public.get_current_teacher_id()
  or exists (
    select 1
    from public.teacher_classes tc
    where tc.teacher_id = teachers.id
      and tc.class_id = public.current_student_class_id()
  )
);

create policy "teachers_admin_insert" on public.teachers for insert with check (public.is_admin());
create policy "teachers_admin_update" on public.teachers for update using (public.is_admin()) with check (public.is_admin());
create policy "teachers_update_own" on public.teachers
for update using (id = public.get_current_teacher_id()) with check (id = public.get_current_teacher_id());
create policy "teachers_admin_delete" on public.teachers for delete using (public.is_admin());

drop policy if exists "teacher_classes_select_by_role" on public.teacher_classes;
drop policy if exists "teacher_classes_admin_insert" on public.teacher_classes;
drop policy if exists "teacher_classes_admin_update" on public.teacher_classes;
drop policy if exists "teacher_classes_admin_delete" on public.teacher_classes;

create policy "teacher_classes_select_by_role" on public.teacher_classes
for select using (
  public.is_admin()
  or teacher_id = public.get_current_teacher_id()
  or class_id = public.current_student_class_id()
);

create policy "teacher_classes_admin_insert" on public.teacher_classes for insert with check (public.is_admin());
create policy "teacher_classes_admin_update" on public.teacher_classes for update using (public.is_admin()) with check (public.is_admin());
create policy "teacher_classes_admin_delete" on public.teacher_classes for delete using (public.is_admin());

drop policy if exists "assignments_select_by_role" on public.assignments;
drop policy if exists "assignments_teacher_insert" on public.assignments;
drop policy if exists "assignments_teacher_update" on public.assignments;
drop policy if exists "assignments_teacher_delete" on public.assignments;

create policy "assignments_select_by_role" on public.assignments
for select using (
  public.is_admin()
  or teacher_id = public.get_current_teacher_id()
  or (
    class_id = public.current_student_class_id()
    and status = 'active'
    and (publish_at is null or publish_at <= now())
  )
);

create policy "assignments_teacher_insert" on public.assignments
for insert with check (
  public.is_admin()
  or (
    teacher_id = public.get_current_teacher_id()
    and public.teacher_teaches_class_subject(teacher_id, class_id, subject_id)
  )
);

create policy "assignments_teacher_update" on public.assignments
for update using (public.is_admin() or teacher_id = public.get_current_teacher_id())
with check (
  public.is_admin()
  or (
    teacher_id = public.get_current_teacher_id()
    and public.teacher_teaches_class_subject(teacher_id, class_id, subject_id)
  )
);

create policy "assignments_teacher_delete" on public.assignments
for delete using (public.is_admin() or teacher_id = public.get_current_teacher_id());

drop policy if exists "submissions_select_by_role" on public.submissions;
drop policy if exists "submissions_student_insert" on public.submissions;
drop policy if exists "submissions_student_update" on public.submissions;
drop policy if exists "submissions_teacher_review_update" on public.submissions;
drop policy if exists "submissions_admin_update" on public.submissions;
drop policy if exists "submissions_admin_delete" on public.submissions;

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
    where a.id = submissions.assignment_id
      and a.class_id = public.current_student_class_id()
      and a.status = 'active'
      and (a.publish_at is null or a.publish_at <= now())
      and (a.deadline is null or now() <= a.deadline)
  )
);

create policy "submissions_student_update" on public.submissions
for update using (student_id = public.get_current_student_id())
with check (
  student_id = public.get_current_student_id()
  and exists (
    select 1
    from public.assignments a
    where a.id = submissions.assignment_id
      and a.status = 'active'
      and (a.deadline is null or now() <= a.deadline)
  )
);

create policy "submissions_teacher_review_update" on public.submissions
for update using (
  exists (
    select 1 from public.assignments a
    where a.id = submissions.assignment_id and a.teacher_id = public.get_current_teacher_id()
  )
) with check (
  exists (
    select 1 from public.assignments a
    where a.id = submissions.assignment_id and a.teacher_id = public.get_current_teacher_id()
  )
);

create policy "submissions_admin_update" on public.submissions
for update using (public.is_admin()) with check (public.is_admin());

create policy "submissions_admin_delete" on public.submissions
for delete using (public.is_admin());

drop policy if exists "grades_select_by_role" on public.grades;
drop policy if exists "grades_teacher_insert" on public.grades;
drop policy if exists "grades_teacher_update" on public.grades;
drop policy if exists "grades_admin_delete" on public.grades;

create policy "grades_select_by_role" on public.grades
for select using (
  public.is_admin()
  or student_id = public.get_current_student_id()
  or teacher_id = public.get_current_teacher_id()
  or public.teacher_teaches_class_subject(public.get_current_teacher_id(), class_id, subject_id)
);

create policy "grades_teacher_insert" on public.grades
for insert with check (
  public.is_admin()
  or (
    teacher_id = public.get_current_teacher_id()
    and public.teacher_teaches_class_subject(teacher_id, class_id, subject_id)
  )
);

create policy "grades_teacher_update" on public.grades
for update using (public.is_admin() or teacher_id = public.get_current_teacher_id())
with check (
  public.is_admin()
  or (
    teacher_id = public.get_current_teacher_id()
    and public.teacher_teaches_class_subject(teacher_id, class_id, subject_id)
  )
);

create policy "grades_admin_delete" on public.grades for delete using (public.is_admin());

drop policy if exists "assignment_comments_select_by_role" on public.assignment_comments;
drop policy if exists "assignment_comments_student_insert" on public.assignment_comments;
drop policy if exists "assignment_comments_student_update" on public.assignment_comments;
drop policy if exists "assignment_comments_admin_delete" on public.assignment_comments;

create policy "assignment_comments_select_by_role" on public.assignment_comments
for select using (
  public.is_admin()
  or student_id = public.get_current_student_id()
  or (
    visibility = 'public'
    and exists (
      select 1
      from public.assignments a
      where a.id = assignment_comments.assignment_id
        and a.teacher_id = public.get_current_teacher_id()
    )
  )
);

create policy "assignment_comments_student_insert" on public.assignment_comments
for insert with check (
  student_id = public.get_current_student_id()
  and profile_id = auth.uid()
  and exists (
    select 1
    from public.assignments a
    where a.id = assignment_comments.assignment_id
      and a.class_id = public.current_student_class_id()
      and a.status = 'active'
      and (a.publish_at is null or a.publish_at <= now())
  )
);

create policy "assignment_comments_student_update" on public.assignment_comments
for update using (student_id = public.get_current_student_id())
with check (student_id = public.get_current_student_id() and profile_id = auth.uid());

create policy "assignment_comments_admin_delete" on public.assignment_comments
for delete using (public.is_admin());

drop policy if exists "announcements_select_by_role" on public.announcements;
drop policy if exists "announcements_admin_insert" on public.announcements;
drop policy if exists "announcements_admin_update" on public.announcements;
drop policy if exists "announcements_admin_delete" on public.announcements;

create policy "announcements_select_by_role" on public.announcements
for select using (
  is_active = true
  and (
    public.is_admin()
    or target_role = 'all'
    or target_role = public.get_current_profile_role()
    or (
      public.is_student()
      and target_role = 'student'
      and (class_id is null or class_id = public.current_student_class_id())
    )
  )
);

create policy "announcements_admin_insert" on public.announcements for insert with check (public.is_admin());
create policy "announcements_admin_update" on public.announcements for update using (public.is_admin()) with check (public.is_admin());
create policy "announcements_admin_delete" on public.announcements for delete using (public.is_admin());

drop policy if exists "settings_select_authenticated" on public.settings;
drop policy if exists "settings_select_public" on public.settings;
drop policy if exists "settings_admin_insert" on public.settings;
drop policy if exists "settings_admin_update" on public.settings;
drop policy if exists "settings_admin_delete" on public.settings;

create policy "settings_select_public" on public.settings
for select using (true);

create policy "settings_admin_insert" on public.settings for insert with check (public.is_admin());
create policy "settings_admin_update" on public.settings for update using (public.is_admin()) with check (public.is_admin());
create policy "settings_admin_delete" on public.settings for delete using (public.is_admin());

drop policy if exists "activity_logs_admin_select" on public.activity_logs;
drop policy if exists "activity_logs_authenticated_insert" on public.activity_logs;

create policy "activity_logs_admin_select" on public.activity_logs for select using (public.is_admin());
create policy "activity_logs_authenticated_insert" on public.activity_logs
for insert with check (actor_id = auth.uid() or public.is_admin());
