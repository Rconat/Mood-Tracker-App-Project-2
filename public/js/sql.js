
$(document).ready(function() {

    const vw_user_mood = `select m.user_id, 
    u.user_name, 
    m.zip, 
    m.weather_abbrev, 
    m.with_others, 
    m.eaten_today, 
    m.medications_today,
    m.user_diary, 
    m.mood_rating, 
    m.createdAt,
    dayname(m.createdAt) as day_name,
    date_format(m.createdAt, "%p") as day_am_pm
    from mood m inner join users u on u.id = m.user_id;`;

    function getUserMoods(user_id) {

        return vw_user_mood + " where m.user_id=" + user_id;

    }
})

