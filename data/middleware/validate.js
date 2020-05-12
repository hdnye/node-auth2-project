const jwt = require('jsonwebtoken');

function validate() {
    return async (req, res, next) => {
        const authErr = {
            message: 'Invalid Credentials'
        }
    try {
        const token = req.cookies.token
        if(!token) {
            return res.status(401).json(authErr)
        }
        jwt.verify(token, process.env.COOKIE_SECRET, (err, decodedPayload) => {
            if(err || decodedPayload.userRole !== role) {
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