const router = require("express").Router();
const sequelize = require("../config/connection");
const {Post, User, Comment} = require("../models");
const auth = require("../lib/auth");

//GET all posts for authorized user
router.get('/', auth, (req, res) => {

});

//GET an individual post to edit for authorized user
router.get('/edit/:id', auth, (req, res) => {

});

module.exports = router;