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
router.post("/", withAuth, (req, res) => {

})

//PUT existing comment for authed user
router.put("/:id", withAuth, (req, res) => {

});

//DELETE existing comment for authed user
router.delete("/:id", withAuth, (req, res) => {

});

module.exports = router;