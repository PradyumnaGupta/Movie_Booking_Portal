
const getSeats=function(audi,slot,day,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
    let today=new Date().getDay();
    db.get(`SELECT Slot_${new Array("A","B","C")[JSON.parse(slot-1)]} FROM auditoriums WHERE Auditorium="${audi}"`,
    (error,seats)=>{
        day=(day<today)?(7-today+day):(day-today);
        seats=JSON.parse(seats[Object.keys(seats)[0]])[day];
        res.send(JSON.stringify(seats));
    });
};

module.exports=getSeats;

