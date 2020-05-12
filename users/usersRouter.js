const User = require('./usersModel')
const validate = require('../data/middleware')

const router = Router();

router.get('/', validate(), async (req, res, next) => {
    try {
        res.json(await User.find())
     } catch(err) {
         next(err)
     }
})


module.exports = router;