-- migrate:up
CREATE TABLE users (
  id int not null auto_increment PRIMARY KEY,
  email varchar(200) not null UNIQUE,
  name varchar(100) not null,
  password varchar(100) not null,
  address varchar(1000) not null,
  phone varchar(100) not null,
  point decimal(10,2) null default 1000000,
  birthdate int not null,
  create_at timestamp default current_timestamp,
  update_at timestamp default current_timestamp on update current_timestamp
);

-- migrate:down

drop table users