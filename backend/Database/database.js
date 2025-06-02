require('dotenv').config()


const mongoose = require('mongoose')

<<<<<<< HEAD
// const mongoURI = process.env.MONGO_URI||'mongodb://localhost:27017/sessionbooking'
const mongoURI='mongodb+srv://sachinsaxenapec:<db_password>@sessionbooking.j37ge8m.mongodb.net/?retryWrites=true&w=majority&appName=sessionBooking'
=======
const mongoURI = 'mongodb+srv://sachinsaxenapec:ZU9DweaaynnIIrfo@sessionbooking.j37ge8m.mongodb.net/?retryWrites=true&w=majority&appName=sessionBooking'
>>>>>>> 7832065783b2c40794624a79b1c77d2cc309f366

const connectTomongo = () => {
    mongoose.connect(mongoURI).then(() => console.log('MongoDB connected!'))
        .catch((err) => console.error('MongoDB connection error:', err));
}
module.exports = connectTomongo;
