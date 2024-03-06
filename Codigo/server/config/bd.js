module.exports = {
    dialect: 'mysql',
    host: 'aws.connect.psdb.cloud',
    username: 'r5urf9gcyysjsonrj0hd',
    password: 'pscale_pw_d2FPyEx2w5M3InPXCGLbk3JDtftNBHNl1iRveF2dnxi',
    database: 'sanzacar',
    define: {
        timestamp: true,
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
};