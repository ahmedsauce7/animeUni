const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const saltRounds = 13;
const isLoggedIn = require('../middleware/route-guard')
const isLoggedOut = require('../middleware/route-guard')
const character = require("../models/character.model");