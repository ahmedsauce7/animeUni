const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 13;
const isLoggedIn = require('../middleware/route-guard')
const isLoggedOut = require('../middleware/route-guard')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


//Log Out
router.post('/logout', (req, res, next) => {
  req.session.destroy(error => {
    if (error) next(error)
    res.redirect('/')
  })
})

// Display signup form
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// Post signup form
router.post("/signup", async (req, res, next) => {
  try {
    const identifyUser = await User.findOne({ username: req.body.username });
    if (!identifyUser) {
      const salt = bcryptjs.genSaltSync(saltRounds);
      const encryptedPass = bcryptjs.hashSync(req.body.password, salt);
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        encryptedPass,
      });
      res.redirect("/auth/login");
    } else if (await User.findOne({ username: req.body.username })) {
      res.render("auth/signup", {
        errorMessage: "Username already exist",
        data: { username: req.body.username },
      });
    } else {
      res.render("auth/signup", {
        errorMessage: "Email already exist",
        data: { username: req.body.username },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Display login form
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

// Post login form
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    if(!!user) {
      if(bcryptjs.compareSync(req.body.password, user.encryptedPass)){
        req.session.user = user
        res.redirect('/application')
      } else {
        res.render('auth/login', {errorMessage: 'Wrong Password'})
      }
    }else{
      res.render('auth/login', {errorMessage: 'User does not exist'})
    }
  } catch (error) {
    console.log(error)
    res.render('auth/login', {errorMessage: 'Error occurred. Please try again'})
  } 
});



module.exports = router;