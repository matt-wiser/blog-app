const router = require("express").Router();
const sequelize = require("../../config/connection");
const {Post, User, Comment} = require("../../models");
const auth = require("../../lib/auth");

//GET all comments
router.get("/", (req, res) => {
    Comment.findAll({
        attributes: ['id','comment_text'],
        include: [
            {
                model: Post,
                attributes: ['id', 'content', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(commentRows => res.json(commentRows))
    .catch(err => {
        res.status(500).json(err);
    });
});

//GET single comment
router.get("/:id", (req, res) =>{
    Comment.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id','comment_text'],
        include: [
            {
                model: Post,
                attributes: ['id', 'content', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(commentRow => res.json(commentRow))
    .catch(err => {
        res.status(500).json(err);
    });
})

//POST new comment for authed user
router.post("/", auth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(commentRow => res.json(commentRow))
        .catch(err => {
            res.status(500).json(err);
        })
    } else {
        res.redirect('/login')
    }
});

//PUT existing comment for authed user
router.put("/:id", auth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
        },
        {
            where:{
                id: req.params.id
            }
        }
    )
    .then(commentRow => {
        if (!commentRow) {
            res.status(404).json({message: "No comment with this id!"});
            return;
        } else {
            res.json(commentRow);
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

//DELETE existing comment for authed user
router.delete("/:id", auth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(commentRow => {
        if (!commentRow) {
            res.status(404).json({message: "No comment with this id!"});
            return;
        } else {
            res.json(commentRow);
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

module.exports = router;