-- TODO: confirm official subject list and KKM.
insert into subjects (code, name, kkm)
values ('MTK', 'Matematika', 75), ('BIN', 'Bahasa Indonesia', 75), ('IPA', 'IPA', 75)
on conflict do nothing;
