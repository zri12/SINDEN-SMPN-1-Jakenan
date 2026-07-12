-- TODO: replace with confirmed student data. Do not seed real personal data before approval.
insert into students (full_name, nis, nisn, gender, status)
values ('Ahmad Fauzan', '2021001', '0051234001', 'L', 'active')
on conflict do nothing;
