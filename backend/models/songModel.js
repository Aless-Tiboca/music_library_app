const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

sql.connect(dbConfig);

const Song = {
    getByAlbumId: async (albumId) => {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('albumId', sql.Int, albumId)
            .query('SELECT * FROM Songs WHERE album_id = @albumId');
        return result.recordset;
    }
};

module.exports = Song;