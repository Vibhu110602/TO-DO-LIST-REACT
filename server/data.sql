create database todolist;

create table todos (
  id varchar(255) primary key,
  user_email varchar(255),
  title varchar(25),
  progress int,
  date varchar(300)
);

create table Person (
  email varchar(255) primary key,
  hash_pass varchar(255)
);