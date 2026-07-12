-- Demo users for development only. Replace passwords/auth strategy before production.
insert into profiles (full_name, username, role)
values
  ('Administrator', 'admin', 'admin'),
  ('Bapak Fauzan', 'guru', 'teacher'),
  ('Ahmad Fauzan', 'siswa', 'student')
on conflict (username) do nothing;
