-- SINDEN 010 - flexible login resolver and profile email support

alter table public.profiles add column if not exists email text;
alter table public.profiles add constraint profiles_email_unique unique (email);

create index if not exists idx_profiles_email_lower on public.profiles (lower(email));
create index if not exists idx_profiles_username_lower on public.profiles (lower(username));
create index if not exists idx_students_nis_lower on public.students (lower(nis));
create index if not exists idx_students_nisn_lower on public.students (lower(nisn));
create index if not exists idx_teachers_nip_lower on public.teachers (lower(nip));
create index if not exists idx_teachers_nuptk_lower on public.teachers (lower(nuptk));

create or replace function public.resolve_login_identifier(identifier_input text)
returns table (
  email text,
  role text,
  profile_id uuid
)
language sql
stable
security definer
set search_path = public
as $$
  with normalized as (
    select lower(trim(identifier_input)) as value
  ),
  profile_match as (
    select p.email, p.role, p.id as profile_id, 1 as priority
    from public.profiles p, normalized n
    where p.is_active = true
      and p.email is not null
      and (
        lower(p.email) = n.value
        or lower(coalesce(p.username, '')) = n.value
      )
  ),
  student_match as (
    select p.email, p.role, p.id as profile_id, 2 as priority
    from public.students s
    join public.profiles p on p.id = s.profile_id
    join normalized n on true
    where p.is_active = true
      and s.status = 'active'
      and p.email is not null
      and (
        lower(coalesce(s.nisn, '')) = n.value
        or lower(coalesce(s.nis, '')) = n.value
      )
  ),
  teacher_match as (
    select p.email, p.role, p.id as profile_id, 3 as priority
    from public.teachers t
    join public.profiles p on p.id = t.profile_id
    join normalized n on true
    where p.is_active = true
      and t.status = 'active'
      and p.email is not null
      and (
        lower(coalesce(t.nip, '')) = n.value
        or lower(coalesce(t.nuptk, '')) = n.value
      )
  )
  select m.email, m.role, m.profile_id
  from (
    select * from profile_match
    union all
    select * from student_match
    union all
    select * from teacher_match
  ) m
  order by m.priority
  limit 1
$$;

grant execute on function public.resolve_login_identifier(text) to anon, authenticated;
