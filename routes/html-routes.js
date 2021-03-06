/* eslint-disable */

// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render('signup')
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login")
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.render('members', {
      user: req.user
    })
  });

  //route for the diary page
  app.get("/diary", isAuthenticated, (req,res) => {
    console.log(req.user);
    res.render('diary', {
      user: req.user
    })
    console.log("user.id = ",req.user.id)
  })

  //route for the graphs page
  app.get("/graphs", isAuthenticated, (req,res) => {
    res.render('graphs', {
      user: req.user
    })
  })

};
