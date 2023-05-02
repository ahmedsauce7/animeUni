const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 13;
const {isLoggedIn} = require('../middleware/route-guard')
const {isLoggedOut} = require('../middleware/route-guard')
const uploader = require('../middleware/cloudinary.config.js');
const Character = require("../models/character.model");

  
  router.get("/items", isLoggedIn, async (req, res) => {
    try {
      const currentUser = req.session.user;
      const shopItems = await Shop.find();
      res.render("items", { shopItems, currentUser });
    } catch (error) {
      console.log(error);
    }
  });
