const express = require('express')
const Booking = require('../schema/SessionScehma')
const router = express.Router()


router.post('/book_session', async (req, res) => {
    let success=false
    try {
        let bookedsession = await Booking.create({
            sessionDate:req.body.sessionDate,
            sessionTime:req.body.sessionTime,
            totalSession:req.body.totalSession||1,
            sessionInterval:req.body.sessionInterval||1,
            sessionDuration:req.body.sessionDuration,
            allsessiondate:req.body.sessionAllpreferreddate,
            lastsessionTime:req.body.lastsessionTime
        })
        bookedsession.save()
        success=true
        res.status(200).json({message:"Session Booked",success})
    } catch (error) {
        console.log(error)
        res.status(500).send(error, "Some Error Occurred")
    }
})
router.get('/Get_all_session',async(req,res)=>{
    try{
        let bookedsession=await Booking.find()
        res.status(200).json({message:"Data recivce",bookedsession})
    }catch(error){
        console.log(error)
    }
})

module.exports=router