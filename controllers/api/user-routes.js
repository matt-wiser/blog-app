const router = require("express").Router();
const { Post, User, Comment } = require('../../models');

//GET all users
router.get("/", (req, res) => {

});

//GET a single user
router.get("/:id", (req, res) => {

});

//POST a new user
router.post("/", (req, res) => {

});

//PUT to update individual user
router.put("/:id", (req, res) => {

});

//DELETE individual user
router.delete("/:id", (req, res) => {

});

//POST request for login
router.post("/login", (req, res) => {

});

//POST request for logout
router.post("/logout", (req, res) => {

});

module.exports = router;