const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

sql.connect(dbConfig);

const Album = {
    getAll: async (limit) => {
        const pool = await sql.connect(dbConfig);
        let query = `
            SELECT a.*, ar.name as artistName
            FROM Albums a
            JOIN Artists ar ON a.artist_id = ar.id
        `;
        if (limit) {
            query += ` ORDER BY a.id OFFSET 0 ROWS FETCH NEXT ${limit} ROWS ONLY`;
        }
        const result = await pool.request().query(query);
        return result.recordset;
    },

    getById: async (id) => {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT a.*, ar.name as artistName FROM Albums a JOIN Artists ar ON a.artist_id = ar.id WHERE a.id = @id');
        return result.recordset[0];
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
