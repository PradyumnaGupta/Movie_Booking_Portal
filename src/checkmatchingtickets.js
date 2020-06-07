
const checkMatchingTickets=function(user,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
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