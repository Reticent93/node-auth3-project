function restrictRole(role) {
    return(req, res, next) => {
        if(req.token && token.userRole === role) {
            next()
        }else {
            res.status(403).json({
                message: "You are not allowed here"
            })
        }
    }
}
module.exports = restrictRole