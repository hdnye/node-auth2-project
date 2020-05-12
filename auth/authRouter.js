const express = require('express');
const User = require('../users/usersModel');
const validate = require('../data/middleware/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findBy({ username }).first()
        if(user) {
            return res.status(409).json({
                message: 'Username already in use'
            })
        }
        res.status(201).json(await User.add(req.body))

    } catch(err) {
        next(err)
    }

})

// router.post('/login', async (req, res, next) => {
//     try {

//     } catch(err) {
//         next(err)
//     }

// }) 

module.exports = router;