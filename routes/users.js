const router = require('express').Router();
let User = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

process.env.SECRET_KEY = "secret"
router.route('/register').post((req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData).then(user => {
                        res.json({ status: user.email + " registered successfully" })
                    })
                        .catch(err => {
                            res.send("error: " + err)
                        })
                })
            } else {
                res.json({ error: "user already exist" })
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/login').post((req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        _id: user._id,
                        email: user.email,
                        password: user.password
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                } else {
                    res.json({ error: "user does not exist" })
                }
            } else {
                res.json({ error: "user does not exist" })
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
