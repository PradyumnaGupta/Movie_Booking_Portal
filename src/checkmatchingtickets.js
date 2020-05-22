
const checkMatchingTickets=function(user,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
    db.all("SELECT * FROM booking_history WHERE Username=$user",{
        $user:user
    },(err,rows)=>{
        console.log(rows);
        res.send(rows);
    })
};

module.exports=checkMatchingTickets;