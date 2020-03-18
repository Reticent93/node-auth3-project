const express = require('express')
const helmet = require('helmet')    
const cookieParser = require('cookie-parser')
const authRouter = require('./auth/auth-router')
const userRouter = require('./users/users-router')


const server = express()
const port = process.env.PORT || 5000
server.use(express.json())
server.use(helmet())
server.use(cookieParser())

server.use('/auth', authRouter)
server.use('/users', userRouter)

server.get('/', (req, res, next) => {
    res.json({
        message: "Welcome to our API"
    })
})


server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})


server.listen(port, () => {
    console.log(`Running at http://localhost${port}`)
})