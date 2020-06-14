
const checkMatchingTickets=function(user,res){
    
    const db=require("./database_initializer.js");
    
    db.get(`SELECT * FROM booked_tickets WHERE Username="${user}" `,
    (error,rows)=>{
        if(error){
            console.log(error);
            res.status(500).send();
            return;
        }
        
        if(rows)
        res.send(rows.Ticket_Details);
        else res.status(204).send("[]");
    });
};

module.exports=checkMatchingTickets;