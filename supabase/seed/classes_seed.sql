-- TODO: expand classes after active academic year is confirmed.
insert into classes (name, grade_level, academic_year)
values ('7A', 7, '2026/2027'), ('8A', 8, '2026/2027'), ('9A', 9, '2026/2027')
on conflict do nothing;
