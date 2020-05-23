
const getSeats=function(audi,slot,day,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
    db.get("SELECT (Slot_$slot) FROM auditoriums WHERE Auditorium=$audi",{
        $slot:slot,
        $audi:audi
    },(error,seats)=>{
        seats=JSON.parse(seats)[day];
        res.send(JSON.stringify(seats));
        console.log(seats);
    });
};

module.exports=getSeats;

