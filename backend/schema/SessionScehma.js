const mongoose = require('mongoose')
const { Schema } = mongoose
const sessionSchema = new Schema({
    sessionDate: {
        type: String,
        required: true
    },
    sessionTime:{
        type:String,
        required: true
    },
    totalSession:{
        type:Number,
        required: true
    },
    sessionInterval:{
        type:Number,
        required: true
    },
    sessionDuration:{
        type:Number,
        required: true
    },
    allsessiondate:{
        type:Array,
        required: true
    },
    lastsessionTime:{
        type:String,
        required: true
    }
})
module.exports=mongoose.model('sessionbook',sessionSchema)