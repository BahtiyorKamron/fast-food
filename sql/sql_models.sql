create table if not exists korzinka(
   id smallserial not null primary key,
   user_id varchar(64) not null references users(id),
   mahsulot_turi varchar(64) ,
   mahsulot_nomi varchar(64) ,
   soni int ,
   vaqti date ,
   holati varchar(64)
);
create table users(
  id varchar(64) not null primary key,
  username varchar(64),
  name varchar(64) not null,
  phone_number varchar(64)
)
update korzinka set soni = 20236 where user_id='2023671991' and mahsulot_turi='pitsa'

create table mahsulotlar(
  id serial not null primary key,
  mahsulot_turi varchar(64) not null,
  mahsulot_nomi varchar(64) not null,
  mahsulot_narxi bigint not null
);
insert into mahsulotlar(mahsulot_turi,mahsulot_nomi,mahsulot_narxi) values
                                                                           ('salat','Olivie',17000),
                                                                           ('salat','Sezar',19000),
                                                                           ('salat','Mujskoy Kapriz',18000),
                                                                           ('ichimlik','Qora Kofe',6000);


create table zakas(
  id serial not null,
  user_id varchar(64) not null,
  user_phone_number varchar(64),
  user_longtitude varchar(64),
  user_latitude varchar(64),
  username varchar(64),
  mahsulotlar varchar(7000)
)
insert into zakas(user_id,user_phone_number,user_location,username,mahsulotlar) values(23445422,998943457689,'234,343','kamron','{4,2,5}')
