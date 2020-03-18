function restrictRole(role) {
return(req, res, next) => {
    if(req.token && req.token.userRole===role) {
        next()
    }else {
        res.status(403).json({
            message: "You are not an authorized user"
        })
    }
}
}

module.exports = restrictRole