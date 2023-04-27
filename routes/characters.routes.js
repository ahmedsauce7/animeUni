const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 13;
const isLoggedIn = require('../middleware/route-guard')
const isLoggedOut = require('../middleware/route-guard')
const character = require("../models/character.model");

router.get('/', (rew, res, next) => {
    res.render('/characterDetails')
});

router.post('/create', async (req, res, next) => {
    try { 
        const characters = await character.create(req.body)
        res.redirect(`/characters/${characters.id}`)
    } catch(error) {
        console.log (error)
    }
})

router.get ('/:id', async (req, res, next) => {
    try {
const newCharacter = await character.findOne(req.body.params)
res.render('characterDetails', {newCharacter})
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;