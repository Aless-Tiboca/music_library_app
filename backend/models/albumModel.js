const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

sql.connect(dbConfig);

const Album = {
    getAll: async (limit = 3) => {
        const result = await sql.query`SELECT TOP ${limit} * FROM Albums`;
        return result.recordset;
    },

    searchByTitle: async (title) => {
        const result = await sql.query`SELECT id, title FROM Albums WHERE title LIKE '%' + ${title} + '%'`;
        return result.recordset;
    }
};

module.exports = Album;