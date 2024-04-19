const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const database = require('./database/indexdb');
//const passport = require('passport');
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
        this.server.use(cors({})); // passar por cima do Access-Control-Allow-Origin
        // configurar o cors ou utilizar outro middleware de acesso
        // para aumentar a segurança da API
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(session({
            secret: 'segredo',
            resave: false,
            saveUninitialized: true,
        }))
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server