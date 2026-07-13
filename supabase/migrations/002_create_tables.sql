-- SINDEN 002 - main tables, constraints, and indexes
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('admin', 'teacher', 'student')),
  email text unique,
  username text unique,
  avatar_url text,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  grade_level integer not null check (grade_level in (7, 8, 9)),
  academic_year text not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  name text not null,
  kkm integer not null default 75 check (kkm >= 0 and kkm <= 100),
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  class_id uuid references public.classes(id) on delete set null,
  nis text,
  nisn text unique,
  full_name text not null,
  gender text check (gender in ('L', 'P')),
  birth_place text,
  birth_date date,
  address text,
  status text not null default 'active' check (status in ('active', 'inactive', 'graduated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  nip text,
  nuptk text,
  full_name text not null,
  gender text check (gender in ('L', 'P')),
  employment_status text,
  teacher_type text,
  phone text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.teacher_classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  academic_year text not null,
  semester text not null check (semester in ('ganjil', 'genap')),
  created_at timestamptz not null default now(),
  unique (teacher_id, class_id, subject_id, academic_year, semester)
);

create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id) on delete cascade,
  class_id uuid not null references public.classes(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  title text not null,
  description text,
  assignment_file_url text,
  assignment_file_path text,
  assignment_link_url text,
  publish_at timestamptz,
  deadline timestamptz,
  status text not null default 'active' check (status in ('active', 'closed', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  submission_file_url text,
  submission_file_path text,
  submission_link_url text,
  note text,
  status text not null default 'submitted' check (status in ('submitted', 'late', 'reviewed')),
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (assignment_id, student_id)
);

create table if not exists public.grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  teacher_id uuid references public.teachers(id) on delete set null,
  class_id uuid references public.classes(id) on delete set null,
  subject_id uuid references public.subjects(id) on delete set null,
  assignment_id uuid references public.assignments(id) on delete set null,
  submission_id uuid references public.submissions(id) on delete set null,
  grade_type text not null default 'assignment' check (grade_type in ('assignment', 'daily_test', 'midterm', 'final', 'practice', 'remedial')),
  score numeric(5,2) not null check (score >= 0 and score <= 100),
  kkm integer not null default 75,
  semester text not null check (semester in ('ganjil', 'genap')),
  academic_year text not null,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assignment_comments (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid references public.students(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  comment text not null,
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.assignments add column if not exists publish_at timestamptz;
alter table public.grades add column if not exists assignment_id uuid references public.assignments(id) on delete set null;
alter table public.grades add column if not exists submission_id uuid references public.submissions(id) on delete set null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'grades_submission_id_unique'
      and conrelid = 'public.grades'::regclass
  ) and not exists (
    select 1
    from public.grades
    where submission_id is not null
    group by submission_id
    having count(*) > 1
  ) then
    alter table public.grades add constraint grades_submission_id_unique unique (submission_id);
  else
    raise notice 'Constraint grades_submission_id_unique sudah ada atau ditunda karena ada data duplikat lama. Jalankan 009 untuk reset demo.';
  end if;
end;
$$;

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  target_role text not null default 'all' check (target_role in ('all', 'admin', 'teacher', 'student')),
  class_id uuid references public.classes(id) on delete set null,
  created_by uuid references public.profiles(id) on delete set null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  app_name text not null default 'SINDEN',
  app_full_name text not null default 'Sistem Informasi Digital Evaluasi Nilai',
  school_name text not null default 'SMP Negeri 1 Jakenan',
  academic_year text not null default '2025/2026',
  semester text not null default 'genap' check (semester in ('ganjil', 'genap')),
  default_kkm integer not null default 75 check (default_kkm >= 0 and default_kkm <= 100),
  logo_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id) on delete set null,
  action text not null,
  entity_type text,
  entity_id uuid,
  description text,
  created_at timestamptz not null default now()
);

create index if not exists idx_students_profile_id on public.students(profile_id);
create index if not exists idx_students_class_id on public.students(class_id);
create index if not exists idx_teachers_profile_id on public.teachers(profile_id);
create index if not exists idx_teacher_classes_teacher_id on public.teacher_classes(teacher_id);
create index if not exists idx_teacher_classes_class_subject on public.teacher_classes(class_id, subject_id);
create index if not exists idx_assignments_teacher_id on public.assignments(teacher_id);
create index if not exists idx_assignments_class_subject on public.assignments(class_id, subject_id);
create index if not exists idx_assignments_publish_status on public.assignments(status, publish_at, deadline);
create index if not exists idx_submissions_assignment_id on public.submissions(assignment_id);
create index if not exists idx_submissions_student_id on public.submissions(student_id);
create index if not exists idx_submissions_assignment_student on public.submissions(assignment_id, student_id);
create index if not exists idx_grades_student_id on public.grades(student_id);
create index if not exists idx_grades_teacher_subject on public.grades(teacher_id, subject_id);
create index if not exists idx_grades_assignment_id on public.grades(assignment_id);
create index if not exists idx_grades_submission_id on public.grades(submission_id);
create index if not exists idx_assignment_comments_assignment_id on public.assignment_comments(assignment_id);
create index if not exists idx_assignment_comments_student_id on public.assignment_comments(student_id);
create index if not exists idx_announcements_target on public.announcements(target_role, class_id);
