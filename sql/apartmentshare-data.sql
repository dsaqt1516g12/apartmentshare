

source apartmentsharedb-schema.sql;

# Create users admin with role administrator
insert into users (id, loginid, password, fullname, email, phone) values (UNHEX(REPLACE(UUID(),'-','')), 'admin', UNHEX(MD5('1234')), 'Administrator', 'Administrator@hotmail.com', '653-56-15-16');
select @idadmin := id from users where loginid='admin';
insert into user_roles (userid, role) values (@idadmin, 'administrator');
insert into auth_tokens (userid, token) values (@idadmin, UNHEX(REPLACE(UUID(),'-','')));




# Create users mrspuff with role registered
insert into users (id, loginid, password, fullname, email, phone) values (UNHEX(REPLACE(UUID(),'-','')), 'registered', UNHEX(MD5('1234')), 'registered', 'registered@hotmail.com', '653-56-15-16');
select @idmrspuff := id from users where loginid='mrspuff';
insert into user_roles (userid, role) values (@idmrspuff, 'registered');
insert into auth_tokens (userid, token) values (@idmrspuff, UNHEX(REPLACE(UUID(),'-','')));


insert into campus_upc values (UNHEX(REPLACE(UUID(),'-','')),'eetac','Esteve Terradas, 7 - 08860 Castelldefels',1.987634899999989,41.2758721);
