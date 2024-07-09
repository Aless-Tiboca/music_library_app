const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');
const dbConfig = require('./config/dbConfig');

const app = express();
app.use(bodyParser.json());
app.use(cors());

sql.connect(dbConfig, err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Connected to database');
});

// CRUD operations
app.get('/artists', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Artists');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/artists/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const artistResult = await sql.query(`SELECT * FROM Artists WHERE id = ${id}`);
        const albumsResult = await sql.query(`SELECT * FROM Albums WHERE artist_id = ${id}`);
        res.json({ artist: artistResult.recordset[0], albums: albumsResult.recordset });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/artists', async (req, res) => {
    const { name } = req.body;
    try {
        await sql.query(`INSERT INTO Artists (name) VALUES ('${name}')`);
        res.status(201).send('Artist created');
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const artistsResult = await sql.query(`SELECT id, name FROM Artists WHERE name LIKE '%${q}%'`);
        const albumsResult = await sql.query(`SELECT id, title as name FROM Albums WHERE title LIKE '%${q}%'`);
        const songsResult = await sql.query(`SELECT id, title as name FROM Songs WHERE title LIKE '%${q}%'`);
        const results = [...artistsResult.recordset, ...albumsResult.recordset, ...songsResult.recordset];
        res.json(results);
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
