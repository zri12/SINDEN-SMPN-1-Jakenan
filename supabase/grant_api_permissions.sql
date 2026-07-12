-- Jalankan file ini di Supabase SQL Editor kalau aplikasi menampilkan:
-- "Profile pengguna belum dibuat" padahal public.profiles sudah OK.
--
-- Penyebabnya biasanya role API authenticated belum punya privilege SQL
-- ke tabel public. RLS tetap menjadi pengaman baris data.

grant usage on schema public to anon, authenticated;

grant execute on all functions in schema public to authenticated;
grant execute on all functions in schema public to anon;

grant select on table
  public.profiles,
  public.classes,
  public.subjects,
  public.students,
  public.teachers,
  public.teacher_classes,
  public.assignments,
  public.submissions,
  public.grades,
  public.announcements,
  public.settings,
  public.activity_logs
to authenticated;

grant insert, update, delete on table
  public.profiles,
  public.classes,
  public.subjects,
  public.students,
  public.teachers,
  public.teacher_classes,
  public.assignments,
  public.submissions,
  public.grades,
  public.announcements,
  public.settings,
  public.activity_logs
to authenticated;

alter default privileges in schema public
grant select, insert, update, delete on tables to authenticated;

alter default privileges in schema public
grant execute on functions to authenticated;
