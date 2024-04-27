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
const { Sequelize } = require("sequelize");

// Configurações de conexão com o banco de dados;
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "Phmcf#2003",
});

/*const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "cacau69#Deus",
});*/

// Função para criar o banco de dados se não existir;
async function createDatabase() {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS recantodoguerreiro;`);
    console.log("Banco de dados criado com sucesso ou já existente");
  } catch (error) {
    console.error("Erro ao criar banco de dados:", error);
  }
}

// Chama a função para criar o banco de dados;
createDatabase();

// Exporta as configurações;
module.exports = {
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "Phmcf#2003",
  database: "recantodoguerreiro",
  define: {
    timestamp: true,
  },
};

/*module.exports = {
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "cacau69#Deus",
  database: "recantodoguerreiro",
  define: {
    timestamp: true,
  },
};*/