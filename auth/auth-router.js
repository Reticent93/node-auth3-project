const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Users = require('../users/users-model')


const router = express.Router()

router.post('/register', async(req, res, next) => {
    try {
        const {username} = req.body
        const user = await Users.findBy({username}).first

        if(user) {
            res.status(409).json({
                message: 'Username is alread taken'
            })
        }
        res.status(201).json(await Users.add(req.body))
    }catch(err) {
        next(err)
    }
})

router.post('/login', (req, res, next) => {
    const authError = {
        message: "Invalid credentials"
    }
    try {
        const {username, password} = req.body
        const user = await Users.findBy({username}).first()
        if(!user) {
            return res.status(401).json(authError)
        }
        const passValid = await bcrypt.compare(password, user.password)
        if(!passValid) {
            return res.status(401).json(authError)
        }
        const payload = {
            userId: user.id,
            userRole = 'normal'
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET)

        res.cookie('token', token)
        res.json({
            message: `Welcome ${user.username}!`
        })
    }catch(err) {
        next(err)
    }

})

module.exports = router