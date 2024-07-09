const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const sql = require('mssql');
const dbConfig = require('./config/dbConfig');

const app = express();
app.use(bodyParser.json());
app.use(cors());

sql.connect(dbConfig, err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to database');
    }
});

app.use('/api', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});