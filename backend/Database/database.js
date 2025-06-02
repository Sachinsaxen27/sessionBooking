require('dotenv').config()


const mongoose = require('mongoose')

const mongoURI ='mongodb+srv://sachinsaxenapec:6WtVUNw16x6GjZap@sessionbooking.j37ge8m.mongodb.net/?retryWrites=true&w=majority&appName=sessionBooking'

const connectTomongo = () => {
    mongoose.connect(mongoURI).then(() => console.log('MongoDB connected!'))
        .catch((err) => console.error('MongoDB connection error:', err));
}
module.exports = connectTomongo;
