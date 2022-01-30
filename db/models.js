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


const chatSchema = new mongoose.Schema({
    from: {type: String, required: true},
    to: {type: String, required: true},
    chat_id: {type: String, required: true},
    content: {type: String, required: true},
    read: {type: Boolean, default: false},
    create_time: {type: Number}
})

const ChatModel = mongoose.model('chat', chatSchema)

exports.ChatModel = ChatModel