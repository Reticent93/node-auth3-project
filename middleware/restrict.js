const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../users/users-model')

function restrict() {
    const authError = {
        message: "You shall not pass"
    }

return async (req, res, next) => {
    console.log(req.headers)
    try {
        const {token} = req.cookies
        if(!token) {
            res.status(401).json(authError)
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).json(authError)
            }
            req.token = decoded
            next()
        })

    }catch(err) {
        next(err)
    }
}

}

module.exports = restrict