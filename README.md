# Project 2 - Diary Tracking Database - Moody!

## Description 

The purpose of this project is to create a full stack application that makes use of a MySQL database, Express web server, and Handlebars npm. The project must be hosted through Heroku. 

To fulfill these requirements we have a created MOODY! The Diary Tracking Website!

Moody is an application that allows users to track their mood through diary entries which are then stored on the Moods Database though our server side database. The user is then given the opportunity to find aspects of their day that might contribute to their overall mood. The data is provided to the user in easy to read charts and a user-friendly interface.

You can find the repo on [GitHub](https://github.com/Rconat/Mood-Tracker-App-Project-2).

The project is deployed on [Heroku](https://calm-castle-04071.herokuapp.com/).

---

![Sign Up Layout](public/images/signUpMainPage.png)
![Login Layout](public/images/loginPage.png)
![Snap Shot Layout](public/images/snapShotPage.png)
![Diary Entry Layout](public/images/diaryEntryPage.png)
![Mood Stats Layout](public/images/moodStatsPage.png)

---

## Table of Contents

* [List of Files](#List-of-Files)
* [Explanation of Code](#Explanation-of-Code)
    * [MySQL Database and Sequelize](#MySQL-Database-and-Sequelize)
    * [Path npm](#Path-npm)
    * [Express npm](#Express-npm)
    * [Passport Authentication](#Passport-Authentication)
    * [JavaScript Libraries](#JavaScript-Libraries)
        * [Google Fonts // Font Awesome](#Google-Fonts-//-Font-Awesome)
        * [Charts.js](#Charts.js)
    * [Weather icon](#Weather-Icon)
    * [Usage](#Usage)
* [Credits](#Credits)

<br>

## List of Files

<ul>
    <li>README.md</li>
    <li>server.js</li>
    <li>package.json</li>
    <li>package-lock.json</li>
    <li>.gitignore</li>
    <li>.eslintignore</li>
    <li>.eslintrc.json</li>
    <li>.travis.yml</li>
    <li>main.handlebars</li>
    <li>diary.handlebars</li>
    <li>graphs.handlebars</li>
    <li>login.handlebars</li>
    <li>members.handlebars</li>
    <li>api-routes.js</li>
    <li>html-routes.js</li>
    <li>reset.css</li>
    <li>style.css</li>
    <li>diary.js</li>
    <li>graphs.js</li>
    <li>login.js</li>
    <li>members.js</li>
    <li>signup.js</li>
    <li>weatherapi.js</li>
    <li>diaryEntryPage.png</li>
    <li>loginPage.png</li>
    <li>moodStatsPage.png</li>
    <li>signUpMainPage.png</li>
    <li>snapShotPage.png</li>
    <li>index.js</li>
    <li>mood.js</li>
    <li>user.js</li>
    <li>schema.sql</li>
    <li>seeds.sql</li>
    <li>config.json</li>
    <li>passport.js</li>
    <li>isAuthenticated.js</li>
</ul>

<br>

# Explanation of Code

## MySQL Database and Sequelize
We utilized a MySQL Database being stored server-side which is then implemented through the use of the Sequelize ORM (Object-relational Mapping). Sequelize is a promise based ORM meaning that it makes use of the NodeJS promise library. 

Using Sequelize we are able to connect to the database stored on the server and allow the client side application to interact with that database. We can pull data from the server side database to be used client side as well as send and post data from the client to the server and allow this data to be stored and used later. 

Additional Sequelize documentation located [here](https://sequelize.org/)

## Path npm
The code makes use of the Path NPM. Path is a node package manager that allows us to use relative paths to associated files rather than using absolute paths. This simply allows us to reference files relative to the file they are being used in rather than needing to state the path to the file as it relates to the root of the file path. Path has been required into the html-routes.js file in the "routes" folder as well as the index.js file in the "models" folder. 

Additional Path npm documentation located [here](https://nodejs.org/api/path.html).

## Express npm
Express NPM is a Node.js web application framework. This framework is used to help develop Node based web applications. The Express framework allows us to set up middlewares that will respond to HTTP requests. Express also allows us to define our routing modules in both the api-routes.js file as well as the html-routes.js file and then using those requests we can dynamically render HTML pages client side to be used in the application. Express is mainly implemented in the server.js file however it references all of the route modules. Express is the framework that allows our client side to communicate with the server side database. 

Additional Express npm documentation located [here](https://expressjs.com/).

## Passport Authentication
The provided code uses an npm package called "Passport" which handles the verification requests. Passport is an API middleware developed for use with Node.js and is Express-compatible which is also being used with our code. Using the Passport API lets us take the very complicated process of user authentication and easily integrate it into the final application. For our purposes here Passport has been set up as a "Local Strategy" which simply handles username and password credentials. Passport offers additional authentication methods with their other strategies however the local strategy is sufficient for our purposes. 

Additional Passport documentation located [here](http://www.passportjs.org/).

## JavaScript Libraries
We have implemented the following JavaScript libraries in this project:

[jQuery](https://jquery.com/)

[Bootstrap](https://getbootstrap.com/docs/4.1/getting-started/introduction)

[Google Fonts](https://fonts.google.com/)

[Font Awesome](https://fontawesome.com/)

[Charts.js](https://www.chartjs.org/)

## Google Fonts // Font Awesome
We used Google Fonts for all fonts that were used throughout the application. We then used Font Awesome for use in our "Star Rating" system. Through the star rating system the user can easily rate their mood in their diary entries to be referenced later if necessary. 

## Charts.js
For this project we utilized Charts.js to help create all of our charts being used throughout the website. This was a very useful npm that helped us easily create and integrate charts that are easy to read and very user friendly. We were able to use simple ajax calls to the server to source the data that is saved and quickly iterate through data to be used. The data from the server was then used as the data inputs to dynamically update the charts as users enter additional diary entries. We were then able to highlight certain data sets such as if the user had been with people that day, if they had eaten, or if they had taken their medication, in order to find correlations between those traits and their overall mood for the day.

Additional Charts.js documentation located [here](https://www.chartjs.org/)

## Weather Icon
We wanted to have an icon on the side of the diary page to show how weather can affect our mood. Instead of having the user manually type in the weather, we used an icon that would pop up after the user would type in the zip code. This is much more accurate as well. 
To do this, we used the openWeather api. With Kristina's api key we called with an Ajax call. This call executes on a change event. Then with the response from the Ajax call we took the icon ID and concatenated it onto a url, to where we were able to append it to an image div.

Additional openWeather documentation located [here](https://openweathermap.org/api).

## Usage 
To use the application users use any internet and navigate to our webpage: [Moody](https://calm-castle-04071.herokuapp.com/). Upon getting to the web address the user can create an account with the application. The user data is saved to a secure database through Heroku. Upon signing in (or logging in if the user already has an account with Moody) the user is welcomed by their user homepage. Here there is a quick breakdown of your last 10 entries shown as a graph as well as displaying your latest diary entry in detail below. From here the user can click on any of the points on the graph to get additional details about any of the diary entries displayed on the graph. There is a "Past 10 Entries" button that will populate the last 10 diary entries in detail below. There is also a "Make a Diary Entry" button that sends the user to the diary entry page where they can fill out a form to create a new diary entry. The diary entry page allows users to record data such as if they have eaten today, if they are with other people, if they have taken any medication, and the weather will be populated upon entering their current zip code. There is a text field where the user can add a diary entry explaining what is going on with them for the entry and some details about what they are feeling. Then at the bottom the user is asked to give an overall mood rating from 1-10. When the user clicks the "Submit" button all of the data will be saved to the server. The diary entry page can also be accessed through the "Diary" button on the nav bar. There is also a Mood-Stats button in the nav bar that displays additional graphs for details about your moods and diary entries. Each parameter that we are tracking through our diary entry page can be highlighted on the bar graph so the user may find correlations between these parameters and their mood.

This website is dynamic and works with any size device. 

## Credits

This project was done under Trilogy Education Services through the Northwestern University Coding Bootcamp. The starter code for this assignment was provided by Trilogy Education Services. The starter code consisted of the functionality of the sign-up and login pages as well as the password authentication code using the passport npm.

This project was done in collaboration with the following contributors:

Kristina Al-Ashqar - https://github.com/kashqar1117

Kimberley Heuer - https://github.com/cotter-tech

Zac Jayes - https://github.com/ZJayes

Ryan Conat - https://github.com/Rconat

---
