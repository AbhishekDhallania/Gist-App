import dotenv from 'dotenv'
dotenv.config({ quiet: true })
import passport from 'passport'

async function authMiddleware(req, res, next) {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized access'
            });
        }
        req.user = user
        next()
    })(req, res, next)

}

export default authMiddleware
