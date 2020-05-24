
const submitFinalTicket=function(user,movie,audi,slot,day,seats,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
    let today=new Date().getDay();
    day=(day<today)?(7-today+day):(day-today);
    db.get("SELECT Slot_$slot FROM auditoriums WHERE Auditorium=$audi",{
        $slot:new Array("A","B","C")[JSON.parse(slot)],
        $audi:audi
    },(error,row)=>{
        seats=JSON.parse(seats);
        arr=JSON.parse(row)[day];
        if(!checkIfSeatsAvailable(arr,seats)){
            res.send("SEATS NOT FOUND");
            return ;
        }
        else {
            for(let i=0;i<seats.length;i++)
            arr.splice(arr.indexOf(seats[i]),1);
            row[day]=arr;
            db.run("UPDATE Auditoriums SET Slot_$slot=$row WHERE Auditorium=$audi",{
                $slot:new Array("A","B","C")[JSON.parse(slot)],
                $row:row,
                $audi:audi
            });
            let date=new Date();
            date=`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
            db.run("INSERT INTO booked_tickets VALUES($user,$date,$movie,$slot,$audi)",{
                $user:user,
                $date:date,
                $movie:movie,
                $slot:new Array("A","B","C")[JSON.parse(slot)],
                $audi:audi
            });
            res.send("OK");
            emailTicket();
        }
    });
};

module.exports=submitFinalTicket;