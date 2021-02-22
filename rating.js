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

submit.click(function() {
    
    console.log("submit")
})




// Josh's working code

// const stars = $('i')
//   stars.hover(function() {
//     var targetStar = (parseInt($(this).data("id"))) - 1
//     stars.each(function(i) {
//       i <= targetStar
//         ? $(this).removeClass('far').addClass('fas')
//         : $(this).removeClass('fas').addClass('far')
//     })
//   })






// console.log(star)

// star.hover(function() {
//     // console.log(parseInt($(this).data("id")))
//     var targetStar = (parseInt($(this).data("id"))) -1
//     for (let i=0; i <= targetStar; i++) {
//         // console.log($("i[data-id=" + i + "]"))
//         $("i[data-id=" + i + "]").removeClass("far").addClass("fas")
//         $(this).removeClass("far").addClass("fas")
//         // console.log($("[data-id]"))
//         // $("i:eq(targetStar)").removeClass("far").addClass("fas")
//         // console.log(star[i])
//         // star[i].removeClass("far").addClass()
//         // if (star.data("id") <= targetStar) {
//         //     // star.removeClass("far").addClass("fas")
//         // }
//         // console.log($("i:eq(targetStar)"))
//         // console.log($(this).siblings().data("id"))
//         // console.log("star array = " + star)
//         // console.log("has class far = " + $(this).hasClass("far"))
//         // console.log("target Star = " + targetStar)
//         // console.log("i = " + i)
//         // console.log("this.data-id = " + $(this).data("id"))
//         // console.log(star[targetStar])
//         // if (i <= targetStar) {
//         //     $(this).removeClass("far").addClass("fas")
//         // }
//     }
//     for (let i=9; i > targetStar; i--) {
//         // console.log(i)
//         // console.log($("i[data-id=" + i+1 + "]"))
//         $("i[data-id=" + (i+1) + "]").removeClass("fas").addClass("far")
//     }

//     // if ($(this).hasClass("far")) {
//     //     for (let i=0; i < star.length; i++) {

//     //         if (i <= (parseInt($(this).data("id")))) {
//     //                 $(this).removeClass("far").addClass("fas")
//     //         }
//     //     }
//     // } else {
//         // for (let i=star.length -1; i >= 0; i--) {

//         //     if (i >= (parseInt($(this).data("id")))) {
//         //             $(this).removeClass("fas").addClass("far")
//         //     }
//         // }
//     // }
// }, function() {

//     // for (let i=0; i < star.length; i++) {
//     //     console.log(parseInt($(this).data("id")))
//     //     if (i <= (parseInt($(this).data("id"))))
//     //         $(this).removeClass("fas").addClass("far")
//     // }
// })