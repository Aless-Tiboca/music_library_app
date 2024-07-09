const fs = require('fs');
const sql = require('mssql');
const dbConfig = require('./config/dbConfig');

// Connect to the database
sql.connect(dbConfig, async err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to database');

    // Read the JSON file
    fs.readFile('./data.json', 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }

        try {
            const jsonData = JSON.parse(data);

            for (const artist of jsonData) {
                // Insert artist
                const artistResult = await sql.query`INSERT INTO Artists (name) OUTPUT Inserted.id VALUES (${artist.name})`;
                const artistId = artistResult.recordset[0].id;

                for (const album of artist.albums) {
                    // Insert album
                    const albumResult = await sql.query`INSERT INTO Albums (artist_id, title, description) OUTPUT Inserted.id VALUES (${artistId}, ${album.title}, ${album.description})`;
                    const albumId = albumResult.recordset[0].id;

                    for (const song of album.songs) {
                        // Insert song
                        await sql.query`INSERT INTO Songs (album_id, title, length) VALUES (${albumId}, ${song.title}, ${song.length})`;
                    }
                }
            }
            console.log('Data insertion completed');
        } catch (err) {
            console.error('Error parsing JSON data or inserting into database:', err);
        }

        sql.close();
    });
});
