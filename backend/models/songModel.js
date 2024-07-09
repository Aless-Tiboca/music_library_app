const sql = require('mssql');
const dbConfig = require('../config/dbConfig');

sql.connect(dbConfig);

const Song = {
    getByAlbumId: async (albumId) => {
        const result = await sql.query`SELECT * FROM Songs WHERE album_id = ${albumId}`;
        return result.recordset;
    }
};

module.exports = Song;