/* eslint-disable */

const star = $("i")
const submit = $("#submit")
star.hover(function() {
    var targetStar = (parseInt($(this).data("id")))
    if (!$(this).hasClass("ratingLocked")) {
        for (let i=0; i <= targetStar; i++) {
            $("i[data-id=" + i + "]").removeClass("far").addClass("fas")
            $(this).removeClass("far").addClass("fas")
        }
        for (let i=10; i > targetStar; i--) {
            $("i[data-id=" + (i+1) + "]").removeClass("fas").addClass("far")
            $(this).removeClass("far").addClass("fas")
        }
    } else if ((!$(this).hasClass("ratingLocked")) && (star.hasClass("ratingLocked"))) {
            for (let i=0; i <= star.length; i++) {
                if ($("i[data-id=" + (i+1) + "]").hasClass("ratingLocked")) {
                    return
                } else {
                    $(this).removeClass("fas").addClass("far")
                }
            }
        }
    }, function() {
    if (star.hasClass("ratingLocked") && (!$(this).hasClass("ratingLocked"))) {
        for (let i=0; i <= star.length; i++) {
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
star.click(function() {
    submit.prop("disabled", false)
    var targetStar = (parseInt($(this).data("id")))
    for (let i=0; i <= targetStar; i++) {
        $("i[data-id=" + i + "]").addClass("ratingLocked")
        $(this).addClass("ratingLocked")
    }
    for (let i=10; i > targetStar; i--) {
        $("i[data-id=" + i + "]").removeClass("ratingLocked")
        if ($(this).hasClass("fas")) {
            $("i[data-id=" + i + "]").removeClass("fas").addClass("far")  
        }
    }
})
var entryRating
submit.click(function() {
    var ratingArray = []
    for (let i=0; i <= star.length; i++) {
        if ($("i[data-id=" + (i+1) + "]").hasClass("ratingLocked")) {
            ratingArray.push(star[i])
        }
    }
    entryRating = ratingArray[ratingArray.length-1].getAttribute('data-id')
    console.log(entryRating + " will be saved as the diary entry rating")
})