const router = require("express").Router();
const { Post, User, Comment } = require('../../models');

//GET all users
router.get("/", (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(userRow => res.json(userRow))
    .catch(err => {
        res.status(500).json(err);
    });
});

//GET a single user
router.get("/:id", (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'user_id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(userRow => {
        if (!userRow) {
            res.status(404).json({message: "No user found with that id!"});
            return;
        } else {
            res.json(userRow);   
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//POST a new user
router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(userRow => {
        req.session.save(() => {
            req.session.user_id = userRow.id;
            req.session.username = userRow.username;
            req.session.loggedIn = true;

            res.json(userRow, {message: "Successfully logged in!"});
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//PUT to update individual user
router.put("/:id", (req, res) => {
    User.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    },
    {
        individualHooks:true,
        where: {
            id: req.params.id
        }
    }
    )
    .then(userRow => {
        if (!userRow[0]) {
            res.status(404).json({message: "No user found with that id!"});
            return;
        } else {
            res.json(userRow);
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

//DELETE individual user
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userRow => {
        if (!userRow) {
            res.status(404).json({message: "No user found with that id!"});
            return;
        } else {
            res.json(userRow);
        }
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//POST request for login
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(userRow => {        
        const validPass = userRow.checkPassword(req.body.password);
        
        if (!userRow) {
            res.status(404).json({message: "No user found with that email!"});
            return;
        } else if (!validPass){
            res.status(400).json({ message: "Invalid password, please try again!" });
            return;
        } else {
            req.session.save(() => {
                req.session.user_id = userRow.id;
                req.session.username = userRow.username;
                req.session.loggedIn = true;

                res.json({user: userRow, message:"Successfully logged in!"});
            })
        }     
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

//POST request for logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

module.exports = router;