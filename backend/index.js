
const express = require('express')
const database = require('./Database/database')
const cors = require('cors')
database()

const app = express()
const port = 3000;
        
app.use(cors());

app.use(express.json({ limit: "10mb", extended: true }))
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }))
app.use('/api/sessionbook', require('./Controller/SessionBooking'))
app.listen(port, () => {
    console.log(`Session Booking is Online at http://localhost:${port}`)
})
