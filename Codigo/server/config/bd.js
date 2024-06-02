//BANCO DE DADOS EXTERNO;
/*module.exports = {
    dialect: 'mysql',
    host: 'mysqlserver.chnjkibcujou.sa-east-1.rds.amazonaws.com',
    username: 'admin',
    password: 'phmcf2003',
    database: 'recantodoguerreiro',
    port: 3306,
    define: {
        timestamp: true,
    },
    dialectOptions: {
        ssl: {
            ssl:'Amazon RDS'
            require: true,
            rejectUnauthorized: false
        }
    },
};*/

//BANCO DE DADOS LOCAL;
/*import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';

/*const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "cacau69#Deus",
});*/

// Função para criar o banco de dados se não existir;
/*async function createDatabase() {
    try {
        await sequelize.query(`CREATE DATABASE IF NOT EXISTS recantodoguerreiro;`);
        console.log("Banco de dados criado com sucesso ou já existente");
    } catch (error) {
        console.error("Erro ao criar banco de dados:", error);
    }
}*/

// Chama a função para criar o banco de dados;
/*createDatabase();

// Exporta as configurações;
module.exports = {
    dialect: PostgresDialect,
    host: 'dpg-cpdr1otds78s73emtgg0-a',
    user: { user },
    password: { password },
    database: 'recantodoguerreiro',
    define: {
        timestamp: true,
    },
};*/

/*module.exports = {
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "RootTis4#",
    database: "recantodoguerreiro",
    define: {
        timestamp: true,
    },
};*/

// TESTE DE DEPLOY
import { PostgresDialect } from '@sequelize/postgres';
require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: PostgresDialect,
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: PostgresDialect,
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: PostgresDialect,
    }
};