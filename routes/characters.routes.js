const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 13;
const isLoggedIn = require('../middleware/route-guard')
const isLoggedOut = require('../middleware/route-guard')
const character = require("../models/character.model");

router.get('/', async (req, res, next) => {
    try {
        const characters = await character.find({player:req.session.user})
        res.render("characterview", {characters});
    } catch (error) {
        console.log(error);
    }
});

router.get("/", (req, res, next) => {
    res.render("main");
  });
// add is loggedin
  router.get("/:Id/", async (req, res) => {
    try {
      const characters = await character.findById(req.params.Id);
      res.render("characterDetails", { characters });
    } catch (error) {
      console.log(error);
    }
  });
// add is loggedin
  router.get("/:Id/details", async (req, res) => {
    try {
      const characters = await character.findById(req.params.Id);
      res.render("characterDetails", { characters });
    } catch (error) {
      console.log(error);
    }
  });
