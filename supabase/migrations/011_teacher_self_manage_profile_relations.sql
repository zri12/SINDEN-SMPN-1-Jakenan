-- Allow teachers to update their own teaching relations from the profile page.
-- Run this after 005_create_rls_policies.sql if teachers need to edit
-- Mata Pelajaran and Kelas Diajar from the app.

drop policy if exists "classes_teacher_select_active" on public.classes;
drop policy if exists "subjects_teacher_select_active" on public.subjects;
drop policy if exists "teacher_classes_teacher_insert_own" on public.teacher_classes;
drop policy if exists "teacher_classes_teacher_update_own" on public.teacher_classes;
drop policy if exists "teacher_classes_teacher_delete_own" on public.teacher_classes;

create policy "classes_teacher_select_active" on public.classes
for select using (public.is_teacher() and is_active = true);

create policy "subjects_teacher_select_active" on public.subjects
for select using (public.is_teacher() and is_active = true);

create policy "teacher_classes_teacher_insert_own" on public.teacher_classes
for insert with check (teacher_id = public.get_current_teacher_id());

create policy "teacher_classes_teacher_update_own" on public.teacher_classes
for update using (teacher_id = public.get_current_teacher_id())
with check (teacher_id = public.get_current_teacher_id());

create policy "teacher_classes_teacher_delete_own" on public.teacher_classes
for delete using (teacher_id = public.get_current_teacher_id());
