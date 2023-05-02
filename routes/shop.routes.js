const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 13;
const {isLoggedIn} = require('../middleware/route-guard')
const {isLoggedOut} = require('../middleware/route-guard')
const uploader = require('../middleware/cloudinary.config.js');
const Character = require("../models/character.model");
/*
router.get("/shop/items", async (req, res) => {
    try {
      const characters = await Character.find();
      console.log("hello",characters)
      res.render("items", { characters });
    } catch (error) {
      console.error(error);
    }
  });

  // POST route to handle form submission
  router.post("/shop/items", async (req, res) => {
    try {
      const character = await Character.findById(req.body.characterId);
      if (!character) {
        return res.status(404).send("Character not found");
      }

      const selectedItems = req.body.items; // assuming items is an array of selected item names

      // update the shop field of the character model with the selected items
      character.shop = selectedItems.map((itemName) => ({ name: itemName, quantity: 1 }));
      await character.save();

      res.redirect(/characters/${character._id}); // redirect to the character page
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });

  // POST route to handle adding an item to the shop
  router.post("/shop/add-item", async (req, res) => {
    try {
      const character = await Character.findById(req.body.characterId);
      if (!character) {
        return res.status(404).send("Character not found");
      }

      const newItem = { name: req.body.itemName, quantity: 1 };
      character.shop.push(newItem);
      await character.save();

      res.redirect("/shop/items");
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });
