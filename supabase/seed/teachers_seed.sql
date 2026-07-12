-- TODO: replace with confirmed teacher data. Keep NIP/NUPTK as text.
insert into teachers (full_name, nip, status)
values ('Bapak Fauzan', '198501012010011001', 'active')
on conflict do nothing;
