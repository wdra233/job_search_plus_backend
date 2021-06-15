const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ywang:wdra233@cluster0.lz5rm.mongodb.net/job-radar?retryWrites=true&w=majority');
const conn = mongoose.connection;
conn.on('connected', () => {
    console.log('Successfully connected!');
})