const express = require('express');
const User = require('../users/usersModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const { username } = req.body
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

router.post('/login', async (req, res, next) => {    
     const authErr = {
        message: 'Invalid Credentials'
      } 
   try {
       const { username, password } = req.body
       const user = await User.findBy({ username }).first()
         if(!user) {
             console.log('checkpoint 1')
             return res.status(401).json(authErr)
         }
        const pswdValid = await bcrypt.compare(password, user.password)
          if(!pswdValid) {
              console.log('checkpoint 2')
              return res.status(401).json(authErr)
         }
         const tokenPayload = {
             subject: user.id,
             username: user.username
         }
        res.cookie('token', jwt.sign(tokenPayload, process.env.COOKIE_SECRET))
        res.json({
            message: `Welcome ${user.username}!`,
        })
    } catch(err) {
        next(err)
    }

}) 

module.exports = router;