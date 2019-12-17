const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');
const knexSessionConnect = require('connect-session-knex')(sessions)

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const databass = require('../database/dbConfig.js');

const server = express();

sessionCofiguration = {
  name: 'cookieemonster',
  secret: 'keep it secret',
  saveUninitialized: true,

  store: new knexSessionConnect({
    databass,
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 18,
  }),

  cookie: {
    maxAge: 1000 * 60 * 18,
    secure: false,
    httpOnly: true
  }
}


server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionCofiguration))

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
