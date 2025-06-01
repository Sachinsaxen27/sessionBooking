require('dotenv').config()


const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI||'mongodb://localhost:27017/sessionbooking'

const connectTomongo = () => {
    mongoose.connect(mongoURI).then(() => console.log('MongoDB connected!'))
        .catch((err) => console.error('MongoDB connection error:', err));
}
module.exports = connectTomongo;