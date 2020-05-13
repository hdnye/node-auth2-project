const jwt = require('jsonwebtoken');

function validate() {
    return async (req, res, next) => {
        const authErr = {
            message: 'Invalid Credentials'
        }
    try {
        const token = req.cookies.token
        if(!token) {
            console.log('checkpoint 1')
            return res.status(401).json(authErr)
        }
        jwt.verify(token, process.env.COOKIE_SECRET, (err, decodedPayload) => {
            if(err || decodedPayload) {
                console.log('checkpoint 2')
                return res.status(401).json(authErr)
            }
            req.token = decodedPayload
            next()
        })

    } catch(err) {
        next(err)
    }   
  }
}

module.exports = validate;