-- Jalankan di Supabase SQL Editor kalau upload/pengumpulan file belum aktif.
-- File siswa disimpan di bucket private `submission-files`.
-- Aplikasi akan membuat signed URL sementara saat file dibuka.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'submission-files',
    'submission-files',
    false,
    10485760,
    array[
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'text/plain',
      'text/csv',
      'application/zip',
      'application/x-rar-compressed'
    ]
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "submission_files_read" on storage.objects;
drop policy if exists "submission_files_student_insert" on storage.objects;
drop policy if exists "submission_files_student_update" on storage.objects;
drop policy if exists "submission_files_student_delete" on storage.objects;

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
  and (
    public.is_admin()
    or split_part(name, '/', 1) = public.get_current_student_id()::text
  )
) with check (
  bucket_id = 'submission-files'
  and (
    public.is_admin()
    or split_part(name, '/', 1) = public.get_current_student_id()::text
  )
);

create policy "submission_files_student_delete" on storage.objects
for delete using (
  bucket_id = 'submission-files'
  and (
    public.is_admin()
    or split_part(name, '/', 1) = public.get_current_student_id()::text
  )
);
