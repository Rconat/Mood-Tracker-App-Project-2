drop database if exists moods;

create database moods;

use moods;

set sql_safe_updates = 0;

create table user (
	id int not null auto_increment,    
    user_name varchar(40),
    user_zip_code int,
    primary key (id)
    );

CREATE TABLE mood
(
	id int not null auto_increment,
	user_id int not null,
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

use moods;

insert into user (user_name, user_zip_code) values ("kheuer", 60004);
insert into user (user_name, user_zip_code) values ("ryan", 48007);
insert into user (user_name, user_zip_code) values ("kristina", 60007);
insert into user (user_name, user_zip_code) values ("zac", 53007);

select * from user;

insert into mood(user_id,zip,weather_abbrev, user_diary, mood_rating)
values(1, 60004, "sun","testing", 5);

insert into mood(user_id,zip,weather_abbrev, user_diary, mood_rating)
values(2, 48007, "cloudy","testing", 5);

insert into mood(user_id,zip,weather_abbrev, user_diary, mood_rating)
values(3, 53007, "windy","testing", 5);

insert into mood(user_id,zip,weather_abbrev, user_diary, mood_rating)
values(4, 60007, "snow","testing", 5);

select * from mood;


