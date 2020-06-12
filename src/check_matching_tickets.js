
const checkMatchingTickets=function(user,res){
    
    const db=require("./database_initializer.js");
    
    db.get(`SELECT * FROM booked_tickets WHERE Username="${user}" `,
    (error,rows)=>{
        if(error)
        console.log(error);
        if(rows)
        res.send(rows.Ticket_Details);
        else res.send("[]");
    });
};

module.exports=checkMatchingTickets;