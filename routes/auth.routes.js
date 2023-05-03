const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 13;
const {isLoggedIn} = require('../middleware/route-guard')
const {isLoggedOut} = require('../middleware/route-guard')
const uploader = require('../middleware/cloudinary.config.js');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});



// Information
router.post('/infos', (req, res, next) => {
  res.redirect('/Info-A')
})
router.post('/infos', (req, res, next) => {
  res.redirect('/Info-B')
})
router.post('/infos', (req, res, next) => {
  res.redirect('/Info-C')
})
router.post('/infos', (req, res, next) => {
  res.redirect('/Info-D')
})

// Universe
router.post('/universe', (req, res, next) => {
  res.redirect('/dragonball')
})
router.post('/universe', (req, res, next) => {
  res.redirect('/naruto')
})
router.post('/universe', (req, res, next) => {
  res.redirect('/nier')
})
router.post('/universe', (req, res, next) => {
  res.redirect('/conan')
})
router.post('/universe', (req, res, next) => {
  res.redirect('/demonslayer')
})
router.post('/universe', (req, res, next) => {
  res.redirect('/tokyoghoul')
})
router.post('/universe', (req, res, next) => {
  res.redirect('/onepiece"')
})
router.post('/universe', (req, res, next) => {
  res.redirect('/sevendeadlysins')
})

// Navigator
router.post('/application', (req, res, next) => {
    res.redirect('/game')
  })
  router.post('/application', (req, res, next) => {
    res.redirect('/infos')
  })
  router.post('/application', (req, res, next) => {
    res.redirect('/characterview')
  })
  router.post('/application', (req, res, next) => {
    res.redirect('/universe')
  })
  router.post('/application', (req, res, next) => {
    res.redirect('/items')
  })

//Log Out
router.post('/logout', (req, res, next) => {
  req.session.destroy(error => {
    if (error) { 
      console.log(error);
      next(error);
    }
    res.redirect('/')
  })
});

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