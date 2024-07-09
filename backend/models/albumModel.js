const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

sql.connect(dbConfig);

const Album = {
    getAll: async (limit = 3) => {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('limit', sql.Int, limit)
            .query('SELECT TOP (@limit) * FROM Albums');
        return result.recordset;
    },

    searchByTitle: async (title) => {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('title', sql.NVarChar, `%${title}%`)
            .query('SELECT id, title FROM Albums WHERE title LIKE @title');
        return result.recordset;
    }
};

module.exports = Album;