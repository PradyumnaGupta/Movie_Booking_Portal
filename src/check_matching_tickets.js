
const Booked_Tickets=require('../Databases/booked_tickets_collection.js');

const checkMatchingTickets=function(user,res){

    Booked_Tickets.findOne({
        Username:user
    }).then((doc)=>{
        if(doc)
        res.status(200).send(doc.Ticket_Details);
        else res.status(204).send();
    }).catch((error)=>{
        console.log(error);
        res.status(500).send();
    });
};

module.exports=checkMatchingTickets;