
const checkMatchingTickets=function(user,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
    db.all(`SELECT * FROM booked_tickets WHERE Username="${user}"`,
    (error,rows)=>{
        if(error)
        console.log(error);
        res.send(rows);
    });
};

module.exports=checkMatchingTickets;