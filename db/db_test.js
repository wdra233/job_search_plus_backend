require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL);
const conn = mongoose.connection;
conn.on('connected', () => {
    console.log('Successfully connected!');
})