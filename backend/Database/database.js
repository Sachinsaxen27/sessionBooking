require('dotenv').config()


const mongoose = require('mongoose')

// const mongoURI = process.env.MONGO_URI||'mongodb://localhost:27017/sessionbooking'
const mongoURI='mongodb+srv://sachinsaxenapec:<db_password>@sessionbooking.j37ge8m.mongodb.net/?retryWrites=true&w=majority&appName=sessionBooking'

const connectTomongo = () => {
    mongoose.connect(mongoURI).then(() => console.log('MongoDB connected!'))
        .catch((err) => console.error('MongoDB connection error:', err));
}
module.exports = connectTomongo;