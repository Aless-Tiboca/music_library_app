const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

sql.connect(dbConfig);

const Artist = {
    getAll: async () => {
        const result = await sql.query`SELECT * FROM Artists`;
        return result.recordset;
    },

    getById: async (id) => {
        const result = await sql.query`SELECT * FROM Artists WHERE id = ${id}`;
        return result.recordset[0];
    },

    create: async (name) => {
        await sql.query`INSERT INTO Artists (name) VALUES (${name})`;
    },

    getAlbumsByArtist: async (id) => {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM Albums WHERE artist_id = @id');
        return result.recordset;
    }
};

module.exports = Artist;
