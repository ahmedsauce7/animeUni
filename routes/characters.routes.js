const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 13;
const {isLoggedIn} = require('../middleware/route-guard')
const {isLoggedOut} = require('../middleware/route-guard')
const Character = require("../models/character.model");
const uploader = require('../middleware/cloudinary.config.js');


router.get('/allcharacters', isLoggedIn, async (req, res, next) => {
  try { 
    const user = req.session.user;
    const allcharacters = await Character.find({player: user._id})
    console.log("hello", allcharacters, user )
    res.render('allcharacters', {allcharacters})
  } catch (error) {
    console.log(error)
  }
});





// router.post('/create', async (req, res, next) => {
//     try { 
//         const characters = await character.create(req.body)
//         res.redirect(`/characters/${characters.id}`)
//     } catch(error) {
//         console.log (error)
//     }
// })

router.get ('/:id/', isLoggedIn, async (req, res, next) => {
  try {
const newCharacter = await Character.findOne({ id: req.params.id })
console.log(newCharacter)
res.render('characterDetails', {newCharacter})
  } catch (error) {
      console.log(error)
  }
})

router.post("/create", isLoggedIn, async (req, res) => {
  try {
    let charImg;
    if (req.body.universe === "Human" && req.body.gender === "Male") {
      charImg = "/images/charImages/Human4.png";
    } else if (req.body.universe === "Human" && req.body.gender === "Female") {
      charImg = "/images/charImages/HumanF.png";
    } else if (req.body.universe === "Saiyan" && req.body.gender === "Male") {
      charImg = "../images/charImages/SaiyanM.jpg";
    } else if (req.body.universe === "Saiyan" && req.body.gender === "Female") {
      charImg = "/images/charImages/SaiyanF.png";
    } else if (req.body.universe === "Shinobi" && req.body.gender === "Male") {
      charImg = "/images/charImages/ShinobiM.png";
    } else if (req.body.universe === "Shinobi" && req.body.gender === "Female") {
      charImg = "/images/charImages/Shinobif.png";
    } else if (req.body.universe === "Demon" && req.body.gender === "Male") {
      charImg = "/images/charImages/DemonM.png";
    } else if (req.body.universe === "Demon" && req.body.gender === "Female") {
      charImg = "/images/charImages/DemonF.png";
    } else if (req.body.universe === "Ghoul" && req.body.gender === "Male") {
      charImg = "/images/charImages/GhoulM.png";
    } else if (req.body.universe === "Ghoul" && req.body.gender === "Female") {
      charImg = "/images/charImages/GhoulF.png";
    } else if (req.body.universe === "Android" && req.body.gender === "Male") {
      charImg = "/images/charImages/AndroidM.png";
    } else if (req.body.universe === "Android" && req.body.gender === "Female") {
      charImg = "/images/charImages/androidF.jpg";
    } else if (req.body.universe === "Alian" && req.body.gender === "Male") {
      charImg = "/images/charImages/alienM.png";
    } else if (req.body.universe === "Alian" && req.body.gender === "Female") {
      charImg = "/images/charImages/alienF.png";
    }
      const charCreation = await Character.create({
      name: req.body.name,
      universe: req.body.universe,
      gender: req.body.gender,
      nickname: req.body.nickname,
      weakness: req.body.weakness,
      weapon: req.body.weapon,
      image: charImg,
      player: req.session.user
    }); 
    console.log("hi",charCreation);
    res.redirect(`/characters/${charCreation.id}/details`)
  } catch (error) {
      console.log(error)
    }
  });



// 1. Update, -> Delete

router.get("/:id/details",isLoggedIn,async (req,res, next)=> {
    try {
        const findChar = await Character.findById(req.params.id);
        res.render("characterDetails",{findChar});
    } catch (error) {
        console.log(error);
    }
});

  router.get("/:id/update", isLoggedIn, async (req, res) => {
    try {
      const findChar = await Character.findById(req.params.id);
      res.render("characterUpdate", { findChar });
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/:id/update", isLoggedIn, async (req, res) => {
    try {
      const updatedId = await Character.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        weapon: req.body.weapon,
        universe: req.body.universe,
      }, {new:true});
      console.log('id:', req.params.id);
      res.redirect(`/characters/${req.params.id}/details`);
    } catch (error) {
      console.log(error);
    }
  });
// 2. Delete
router.get("/:id/delete", isLoggedIn, async (req, res) => {
    try {
      const toDelete = await Character.findById(req.params.id);
      res.render("characterDelete", { toDelete });
    } catch (error) {
      console.log(error);
    }
  });
  
  router.get("/:id/deleteValid", isLoggedIn, async (req, res) => {
    try {
      await Character.findByIdAndDelete(req.params.id);
      res.redirect("/characters/allcharacters");
    } catch (error) {
        console.log(error);
    }
  });

  // any comment

module.exports = router; 