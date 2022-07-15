const router = require("express").Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const auth = require('../../lib/auth');

//GET all posts
router.get("/", (req, res) =>{
    Post.findAll({
        attributes: ['id', 'content', 'title', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: 'User',
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postRows => res.json(postRows))
    .catch(err => {
        res.status(500).json(err);
    });
});

//GET a single post
router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'content', 'title', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: 'User',
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(postRow => {
        if (!postRow) {
            res.status(404).json({message: "No post found with that id!"});
            return;
        } else {
            res.json(postRow);
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//POST a new post for authed user
router.post("/", auth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
    .then(postRow => res.json(postRow))
    .catch(err => {
        res.status(500).json(err);
    });
});

//PUT an existing post for an authed user, updating a blog post
router.put("/:id", auth, (req, res) => {
    Post.update(
        {
            where: {
                id: req.params.id
            }
        },
        {
            title: req.body.title,
            content: req.body.content
        }
    )
    .then(postRow => {
        if (!postRow) {
            res.status(404).json({message: "No post found with that id, unable to update!"});
            return;
        } else {
            res.json(postRow);
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//DELETE an existing post and its associated comments for an authed user
router.delete("/:id", auth, (req, res) => {
    Comment.destroy({
        where: {
            post_id: req.params.id
        }
    })
    .then(() => {
        Post.destroy({
            where: {
                id: req.params.id
            }
        });
    })
    .then(postRows => {
        if (!postRows) {
            res.status(404).json({message: "No post found with that id, unable to delete!"});
            return;
        } else {
            res.json(postRows);
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;