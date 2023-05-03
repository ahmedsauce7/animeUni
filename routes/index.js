const { isLoggedIn } = require("../middleware/route-guard");
const User = require("../models/User.model");
const uploader = require('../middleware/cloudinary.config.js');

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
 console.log(req.session.user);
  res.render("index");
});

router.get("/application", isLoggedIn, (req, res, next) => {
  res.render("application", {user: req.session.user});
});

// Navigator
router.get("/main", isLoggedIn, (req, res, next) => {
  res.render("main", {user: req.session.user});
});

router.get("/items", isLoggedIn, (req, res, next) => {
  res.render("items", {user: req.session.user});
});
router.get("/game", isLoggedIn, (req, res, next) => {
  res.render("game", {user: req.session.user});
});
router.get("/infos", isLoggedIn, (req, res, next) => {
  res.render("infos", {user: req.session.user});
});
router.get("/characterview", isLoggedIn, (req, res, next) => {
  res.render("characterview", {user: req.session.user});
});
router.get("/universe", isLoggedIn, (req, res, next) => {
  res.render("universe", {user: req.session.user});
});

// Universe
router.get("/dragonball", isLoggedIn, (req, res, next) => {

  res.render("dragonball", {user: req.session.user});
});
router.get("/naruto", isLoggedIn, (req, res, next) => {
 
  res.render("naruto", {user: req.session.user});
});
router.get("/nier", isLoggedIn, (req, res, next) => {

  res.render("nier", {user: req.session.user});
});
router.get("/conan", isLoggedIn, (req, res, next) => {
  res.render("conan", {user: req.session.user});
});
router.get("/demonslayer", isLoggedIn, (req, res, next) => {
  res.render("demonslayer", {user: req.session.user});
});
router.get("/tokyoghoul", isLoggedIn, (req, res, next) => {
  res.render("tokyoghoul", {user: req.session.user});
});
router.get("/onepiece", isLoggedIn, (req, res, next) => {
  res.render("onepiece", {user: req.session.user});
});
router.get("/sevendeadlysins", isLoggedIn, (req, res, next) => {

  res.render("sevendeadlysins", {user: req.session.user});
});
// Information
router.get("/Info-A", isLoggedIn, (req, res, next) => {

  res.render("Info-A", {user: req.session.user});
});
router.get("/Info-B", isLoggedIn, (req, res, next) => {
 
  res.render("Info-B", {user: req.session.user});
});
router.get("/Info-C", isLoggedIn, (req, res, next) => {
  res.render("Info-C", {user: req.session.user});
});
router.get("/Info-D", isLoggedIn, (req, res, next) => {
  res.render("Info-D", {user: req.session.user});
});

// Character View
router.get("/songoku", isLoggedIn, (req, res, next) => {

  res.render("songoku", {user: req.session.user});
});
router.get("/naruto1", isLoggedIn, (req, res, next) => {
 
  res.render("naruto1", {user: req.session.user});
});
router.get("/a22b9s", isLoggedIn, (req, res, next) => {

  res.render("a22b9s", {user: req.session.user});
});
router.get("/conan1", isLoggedIn, (req, res, next) => {
  res.render("conan1", {user: req.session.user});
});
router.get("/kamado", isLoggedIn, (req, res, next) => {
  res.render("kamado", {user: req.session.user});
});
router.get("/kaneki", isLoggedIn, (req, res, next) => {
  res.render("kaneki", {user: req.session.user});
});
router.get("/luffy", isLoggedIn, (req, res, next) => {
  res.render("luffy", {user: req.session.user});
});
router.get("/meliodas", isLoggedIn, (req, res, next) => {

  res.render("meliodas", {user: req.session.user});
});

module.exports = router;