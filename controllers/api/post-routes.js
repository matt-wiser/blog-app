const router = require("express").Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const auth = require('../../lib/auth');

//GET all users
router.get("/", (req, res) =>{

});

//GET a single post
router.get("/:id", (req, res) => {

});

//POST a new post for authed user
router.post("/", auth, (req, res) => {

});

//PUT an existing post, adding an upvote
router.put("/upvote", (req, res) => {

});

//PUT an existing post for an authed user, updating a blog post
router.put("/:id", auth, (req, res) => {

});

//DELETE an existing post for an authed user
router.delete("/:id", auth, (req, res) => {

});

module.exports = router;