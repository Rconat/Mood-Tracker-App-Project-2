$(document).ready(function () {
    // Getting jQuery references to the form and fields

    const diaryForm = $("#diary");

    const txtZip = $("#zip");
    let zip;

    const radEatenToday = $(".eaten-today");
    let eaten_today;

    const radWithPeople = $(".with-people");
    let with_others;

    const radTakenMedication = $(".taken-medication");
    let medications_today;

    const txtDiary = $("#txt-diary");
    let user_diary;

    const btnSubmit = $(".submit");
    let UserId = parseInt( btnSubmit.attr("data-userId"))

    $(diaryForm).on("submit", handleFormSubmit);


    function handleFormSubmit(event) {
        event.preventDefault();

        console.log("submit!");

        // Won't submit the diary if we are missing the zip requirement
        //

        zip = parseInt( txtZip.val());

        for (const rb of radEatenToday) {
            if (rb.checked) {
                eaten_today = rb.value;            
                break;
            }
        }

        for (const rb of radWithPeople) {
            if (rb.checked) {
                with_others = rb.value;               
                break;
            }
        }

        for (const rb of radTakenMedication) {
            if (rb.checked) {
                medications_today = rb.value;                
                break;
            }
        }

        user_diary = txtDiary.val();

        let mood_rating = GetStarRating();

        var newMood = {
            UserId: UserId,
            zip,
            with_others: with_others === "yes",
            eaten_today: eaten_today === "yes",
            medications_today: medications_today === "yes",
            user_diary: user_diary,
            mood_rating: mood_rating
        }

        console.log("New Mood ", newMood);
        

        $.post("/api/mood", newMood)
            .then((res) => {                
                
                console.log("pausing");
                window.location.replace("/members");
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    }

    //
    // star rating hover 
    
    const star = $("i")
    star.hover(function () {
        var targetStar = (parseInt($(this).data("id")))
        if (!$(this).hasClass("ratingLocked")) {
            for (let i = 0; i <= targetStar; i++) {
                $("i[data-id=" + i + "]").removeClass("far").addClass("fas")
                $(this).removeClass("far").addClass("fas")
            }
            for (let i = 10; i > targetStar; i--) {
                $("i[data-id=" + (i + 1) + "]").removeClass("fas").addClass("far")
                $(this).removeClass("far").addClass("fas")
            }
        } else if ((!$(this).hasClass("ratingLocked")) && (star.hasClass("ratingLocked"))) {
            for (let i = 0; i <= star.length; i++) {
                if ($("i[data-id=" + (i + 1) + "]").hasClass("ratingLocked")) {
                    return
                } else {
                    $(this).removeClass("fas").addClass("far")
                }
            }
        }
    }, function () {
        if (star.hasClass("ratingLocked") && (!$(this).hasClass("ratingLocked"))) {
            for (let i = 0; i <= star.length; i++) {
                if (!$(this).hasClass("ratingLocked")) {
                    if ($("i[data-id=" + i + "]").hasClass("ratingLocked")) {
                        $("i[data-id=" + i + "]").removeClass("far").addClass("fas")
                    } else if (!$("i[data-id=" + i + "]").hasClass("ratingLocked")) {
                        $("i[data-id=" + i + "]").removeClass("fas").addClass("far")
                    }
                }
            }
        } else if (star.hasClass("ratingLocked")) {
            return
        } else if (!$(this).hasClass("ratingLocked")) {
            star.removeClass("fas").addClass("far")
        }
    })
    star.click(function () {
        btnSubmit.prop("disabled", false)
        var targetStar = (parseInt($(this).data("id")))
        for (let i = 0; i <= targetStar; i++) {
            $("i[data-id=" + i + "]").addClass("ratingLocked")
            $(this).addClass("ratingLocked")
        }
        for (let i = 10; i > targetStar; i--) {
            $("i[data-id=" + i + "]").removeClass("ratingLocked")
            if ($(this).hasClass("fas")) {
                $("i[data-id=" + i + "]").removeClass("fas").addClass("far")
            }
        }
    })
    
    function GetStarRating() {
        var entryRating
        var ratingArray = []
            for (let i = 0; i <= star.length; i++) {
                if ($("i[data-id=" + (i + 1) + "]").hasClass("ratingLocked")) {
                    ratingArray.push(star[i])
                }
            }
            entryRating = ratingArray[ratingArray.length - 1].getAttribute('data-id')
            console.log(entryRating + " will be saved as the diary entry rating")

            return entryRating;
    }
})

