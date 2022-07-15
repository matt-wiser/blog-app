const router = require("express").Router();
const sequelize = require("../../config/connection");
const {Post, User, Comment} = require("../../models");
const auth = require("../../lib/auth");

//GET all comments
router.get("/", (req, res) => {

});

//GET single comment
router.get("/:id", (req, res) =>{

})

//POST new comment for authed user
router.post("/", auth, (req, res) => {

})

//PUT existing comment for authed user
router.put("/:id", auth, (req, res) => {

});

//DELETE existing comment for authed user
router.delete("/:id", auth, (req, res) => {

});

module.exports = router;