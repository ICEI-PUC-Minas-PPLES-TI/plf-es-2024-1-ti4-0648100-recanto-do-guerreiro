const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const database = require('./database/indexdb');
const passport = require('passport');
const session = require('express-session');

// CONFIGURAÇÕES DE SERVIDOR
class App {
    constructor() { // construtor do Servidor
      this.server = express();
      this.middlewares();
      this.routes();
    }

    middlewares() {
      this.server.use(express.json());
      this.server.use(express.static('tmp'))
      this.server.use('/imgs', express.static('imgs'))
      this.server.use(cors({ }));
      this.server.use(express.urlencoded({ extended: false }))
      this.server.use(session({
        secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
      }))
      this.server.use(passport.initialize())
      this.server.use(passport.session())
    }

    routes() {
      this.server.use(routes);
    }
  }

module.exports = new App().server