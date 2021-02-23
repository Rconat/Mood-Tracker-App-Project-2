drop database if exists moods;

create database moods;

use moods;

set sql_safe_updates = 0;

create table user (
	id int not null auto_increment,    
    email varchar(40),
    password varchar(200),
    primary key (id)
    );

CREATE TABLE mood
(
	id int not null auto_increment,
    zip int,
    weather_abbrev varchar(20), 
	with_others boolean default false,
    eaten_today boolean default false,
    medications_today boolean default false,
    user_diary text,
    mood_rating int default 0,
    date_created datetime default current_timestamp,
	PRIMARY KEY (id)
);



