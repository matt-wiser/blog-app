const router = require("express").Router();
const { Post, User, Comment } = require('../../models');

//GET all users
router.get("/", (req, res) => {
    res.send({message: "hello world"});
});

//GET a single user
router.get("/:id", (req, res) => {
    res.send({message: "hello world"});
});

//POST a new user
router.post("/", (req, res) => {
    res.send({message: "hello world"});
});

//PUT to update individual user
router.put("/:id", (req, res) => {
    res.send({message: "hello world"});
});

//DELETE individual user
router.delete("/:id", (req, res) => {
    res.send({message: "hello world"});
});

//POST request for login
router.post("/login", (req, res) => {
    res.send({message: "hello world"});
});

//POST request for logout
router.post("/logout", (req, res) => {
    res.send({message: "hello world"});
});

module.exports = router;