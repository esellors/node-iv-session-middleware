module.exports = {
    verifyUser: (req, res, next) => {
        if (!req.session.user) {
            res.status(403).json({ message: "You must be logged in for that!" })
        } else {
            next();
        }
    },
    verifyAdmin: (req, res, next) => {
        if (!req.session.user.isAdmin) {
            res.status(403).json({ message: "You are not authorized!" })
        } else {
            next();
        }
    }
}