// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");
const { reporters } = require("mocha");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });


  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      console.log("no user defined");
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      // res.json({
      //   email: req.user.email,
      //   id: req.user.id
      // });

      //console.log("req.user = ", req.user);
      db.Mood.findAll({
        where: {
          UserId: req.user.id
        }
      })
        .then(function(data) {
          // console.log("Mood data: ",data);

          // data.forEach(element => {
          //   console.log("create on: ",element.createdAt)
          //   console.log("create on: ", element.createdAt.toLocaleString("default", { weekday: "long" }))
          //   console.log("am or pm: ",element.createdAt.getHours()  )
          //   console.log("zip: ",element.zip)
          //   console.log("weather: ",element.weather_abbrev)
          //   console.log("with others: ",element.with_others)
          //   console.log("eaten today: ",element.eaten_today)
          //   console.log("diary: ",element.user_diary)
          //   console.log("mood stars: ",element.mood_rating)
          //   console.log("zip: ",element.zip)
          // });

          res.json(data);
        })
        .catch(err => {
          res.status(401).json(err);
        });
    }    
  });

  // 
  // get all moods for this user.  
  // return results to our 

  app.get("/api/user_moods/:id", (req, res) => {
   
     db.Mood.findAll({
       where: {
         UserId: req.params.id
       }
     })
     .then(() => {
      res.redirect(307, "/api/members");
     })
     .catch(err => {
      res.status(401).json(err);
    });
  });

  // 
  // add a new mood for this user.  
  // UserId is the Mood foreign key between tables, Userss and Mood

  app.post("/api/mood", (req, res) => {
    
    db.Mood.create({
      UserId: req.body.UserId,
      zip: req.body.zip,
      weather_abbrev: req.body.weather_abbrev,
      with_others: req.body.with_others,
      eaten_today: req.body.eaten_today,
      medications_today: req.body.medications_today,
      user_diary: req.body.user_diary,
      mood_rating: req.body.mood_rating
    })
      .then((data) => {
        res.json(data);
        //res.redirect(307, "/members");
      })
      .catch(err => {       
        res.status(401).json(err);
      });
  });

  app.get("/diary", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      console.log("no user defined");
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });


};
