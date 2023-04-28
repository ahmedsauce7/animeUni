const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 13;
const {isLoggedIn} = require('../middleware/route-guard')
const {isLoggedOut} = require('../middleware/route-guard')
const character = require("../models/character.model");

router.get('/', (req, res, next) => {
    res.render('characterDetails')
});

// router.post("/create", isLoggedIn, async (req, res) => {
//   try {
//     let imgUrl;
//     if (req.body.universe === "Human" && req.body.gender === "Male") {
//       imgUrl = "/images/charImages/HumanM4.webp";
//     } else if (req.body.universe === "Human" && req.body.gender === "Female") {
//       imgUrl = "/images/charImages/HumanF.png";}
//     } catch(error){
//       console.log(error)
//     }
//   });
   

router.post('/create', async (req, res, next) => {
    try { 
        const characters = await character.create(req.body)
        res.redirect(`/characters/${characters.id}`)
    } catch(error) {
        console.log (error)
    }
})

router.get ('/:id', isLoggedIn, async (req, res, next) => {
    try {
const newCharacter = await character.findOne({ id: req.params.id })
res.render('characterDetails', {newCharacter})
    } catch (error) {
        console.log(error)
    }
})

// 1. Update, -> Delete

router.get("/:id/details",isLoggedIn,async (req,res, next)=> {
    try {
        const character = await character.findById(req.params.id);
        res.render("characterDetails",{character});
    } catch (error) {
        console.log(error);
    }
});

  router.get("/:id/update", isLoggedIn, async (req, res) => {
    try {
      const character = await character.findById(req.params.id);
      res.render("characterUpdate", { character });
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/:id/update", isLoggedIn, async (req, res) => {
    try {
      await character.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        weapon: req.body.weapon,
        universe: req.body.universe,
      });
      res.redirect(`/characters/${req.params.id}/details`);
    } catch (error) {
      console.log(error);
    }
  });
// 2. Delete
router.get("/:id/delete", isLoggedIn, async (req, res) => {
    try {
      const toDelete = await character.findById(req.params.id);
      res.render("characterDelete", { toDelete });
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/:id/deleteValid", isLoggedIn, async (req, res) => {
    try {
      await character.findByIdAndDelete(req.params.id);
      res.redirect("/characters");
    } catch (error) {
        console.log(error);
    }
  });

  // any comment

module.exports = router; 