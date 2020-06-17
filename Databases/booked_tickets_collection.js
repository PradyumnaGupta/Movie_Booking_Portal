const mongoose=require('mongoose');

const bookedTicketsSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
    },
    Ticket_Details:{
        type:Array,
        required:true
    }
});

module.exports=mongoose.model('Booked_Tickets',bookedTicketsSchema);