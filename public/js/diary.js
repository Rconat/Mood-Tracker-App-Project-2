console.log("diary.js")



const successCallback = (position) => {

    console.log(position)


}
const errorcallback = (error) => {

    console.log(error)
    console.log("thiserror happened")


}

navigator.geolocation.getCurrentPosition(successCallback , errorcallback)