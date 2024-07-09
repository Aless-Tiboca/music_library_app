require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        enableArithAbort: true,
        trustedConnection: true,
        instanceName: process.env.DB_INSTANCE,
        trustServerCertificate: true,
    }
};

module.exports = config;
