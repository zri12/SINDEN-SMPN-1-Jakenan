-- SINDEN 007 - storage policies

create policy "assignment_files_read" on storage.objects
for select using (
  bucket_id = 'assignment-files'
  and (
    public.is_admin()
    or split_part(name, '/', 1) = public.get_current_teacher_id()::text
    or exists (
      select 1
      from public.assignments a
      join public.students s on s.class_id = a.class_id
      where a.assignment_file_path = name
        and s.id = public.get_current_student_id()
    )
  )
);

create policy "assignment_files_teacher_insert" on storage.objects
for insert with check (
  bucket_id = 'assignment-files'
  and (
    public.is_admin()
    or split_part(name, '/', 1) = public.get_current_teacher_id()::text
  )
);

create policy "assignment_files_teacher_update" on storage.objects
for update using (
  bucket_id = 'assignment-files'
  and (public.is_admin() or split_part(name, '/', 1) = public.get_current_teacher_id()::text)
) with check (
  bucket_id = 'assignment-files'
  and (public.is_admin() or split_part(name, '/', 1) = public.get_current_teacher_id()::text)
);

create policy "assignment_files_teacher_delete" on storage.objects
for delete using (
  bucket_id = 'assignment-files'
  and (public.is_admin() or split_part(name, '/', 1) = public.get_current_teacher_id()::text)
);

create policy "submission_files_read" on storage.objects
for select using (
  bucket_id = 'submission-files'
  and (
    public.is_admin()
    or split_part(name, '/', 1) = public.get_current_student_id()::text
    or exists (
      select 1
      from public.submissions sub
      join public.assignments a on a.id = sub.assignment_id
      where sub.submission_file_path = name
        and a.teacher_id = public.get_current_teacher_id()
    )
  )
);

create policy "submission_files_student_insert" on storage.objects
for insert with check (
  bucket_id = 'submission-files'
  and split_part(name, '/', 1) = public.get_current_student_id()::text
);

create policy "submission_files_student_update" on storage.objects
for update using (
  bucket_id = 'submission-files'
  and (public.is_admin() or split_part(name, '/', 1) = public.get_current_student_id()::text)
) with check (
  bucket_id = 'submission-files'
  and (public.is_admin() or split_part(name, '/', 1) = public.get_current_student_id()::text)
);

create policy "submission_files_student_delete" on storage.objects
for delete using (
  bucket_id = 'submission-files'
  and (public.is_admin() or split_part(name, '/', 1) = public.get_current_student_id()::text)
);
