require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL);
const conn = mongoose.connection;

conn.on('connected', () => {
    console.log('DB Successfully connected!');
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: {type: String, required: true},
    header: {type: String},
    post: {type: String},
    info: {type: String},
    company: {type: String},
    salary: {type: String}
});

const UserModel = mongoose.model('user', userSchema);

// 分别暴露
exports.UserModel = UserModel;