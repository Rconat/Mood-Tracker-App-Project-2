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

create view vw_user_mood
    as
	select user_id, 
		user_name, 
		zip, 
		weather_abbrev, 
		with_others, 
		eaten_today, 
		medications_today,
		user_diary, 
		mood_rating, 
		date_created,
        dayname(date_created) as day_name,
        date_format(date_created, "%p") as day_am_pm
	from mood m inner join user u on u.id = m.user_id;
    
# example queries    
select * from user;
    
select * from vw_user_mood;
    
select * from vw_user_mood where user_name='ryan';


