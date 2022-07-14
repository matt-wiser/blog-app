const router = require("express").Router();
const sequelize = require("../config/connection");
const {Post, User, Comment} = require("../models");


//GET all posts for unauthed user
router.get('/', (req, res) => {

});

//GET login page, check if user is logged in - redirect if so
router.get('/login', (req, res) => {

});

//GET single post for unauthed user
router.get('/posts/:id')


module.exports = router;