const mongoose = require('mongoose');
require('dotenv').config();

const mongodbURL = "mongodb+srv://madheshsiva28_db_user:pykN05qTWVQWYJwK@mockbackend.lqzxmkt.mongodb.net/?appName=mockbackend"

|| process.env.MONGODB_URL;

const mongodbConnection = async() => {
try{
const connect = await mongoose.connect(mongodbURL)
}catch(err) {
console.log(`Error connecting to MongoDB: ${err}`);
}
}

module.exports = mongodbConnection;