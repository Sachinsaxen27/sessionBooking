require('dotenv').config({ path: '.env.development'});

const express = require('express')
const database = require('./Database/database')
const cors = require('cors')
database()

const app = express()
<<<<<<< HEAD
const port = 3000;
=======
const port = 5000;
>>>>>>> 7832065783b2c40794624a79b1c77d2cc309f366
        
app.use(cors());

app.use(express.json({ limit: "10mb", extended: true }))
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }))
app.use('/api/sessionbook', require('./Controller/SessionBooking'))
app.listen(port, () => {
    console.log(`Ticket System is Online at http://localhost:${port}`)
})
