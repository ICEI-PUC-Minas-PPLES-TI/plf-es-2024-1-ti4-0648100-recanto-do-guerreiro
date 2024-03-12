//BANCO DE DADOS EXTERNO

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

//BANCO DE DADOS LOCAL

module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'Phmcf#2003',
    database: 'recantodoguerreiro',
    define: {
        timestamp: true,
    },
};