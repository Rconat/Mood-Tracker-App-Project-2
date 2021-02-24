use moods;

insert into mood(UserId, zip, weather_abbrev, with_others, eaten_today, medications_today, user_diary, mood_rating, createdAt, updatedAt)
values(1, 60004, "cloudy", true, false, false, "i'm starving", 5, now(), now());

select * from mood;



