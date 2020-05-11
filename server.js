const express = require('express');
const db = require('./data/config');
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);
//const usersRouter = require('./data/users/usersRouter');
//const authRouter = require('./data/auth/authRouter')

const server = express()

//middleware
server.use(express.json());
server.use(cors())
server.use(helmet())
server.use(session({
    name: 'token',
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || secret,
    cookie: {
        httpOnly: true
    },
    store: new KnexSessionStore({
        knex: db,
        createTable: true,
    }),
}))

//routers
//server.use('/users', usersRouter);
//server.use('/auth', authRouter);

//welcome message
server.get('/', (req, res, next) => {
    res.json({
        message: 'Welcome to my API'
    })
})

//error message
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'Unable to complete request'
    })
})

module.exports = server;