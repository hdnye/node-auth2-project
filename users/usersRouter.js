const express = require('express');
const User = require('./usersModel');
const validate = require('../data/middleware/validate');

const router = express.Router();

router.get('/', validate(), async (req, res, next) => {
    try {
        res.json(await User.find())
     } catch(err) {
         next(err)
     }
});


module.exports = router;