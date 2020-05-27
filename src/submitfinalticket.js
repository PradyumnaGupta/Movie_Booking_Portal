const emailTicket=require('./emailticket.js');
const checkIfSeatsAvailable=require('./utils.js');

const submitFinalTicket=function(user,movie,audi,slot,day,seats,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
    let today=new Date().getDay();
    day=(day<today)?(7-today+day):(day-today);
    db.get(`SELECT Slot_${new Array("A","B","C")[JSON.parse(slot)]} FROM auditoriums WHERE Auditorium="${audi}"`,
    (error,row)=>{
        if(error)
        console.log(error);
        seats=JSON.parse(seats);
        row=JSON.parse(row[Object.keys(row)[0]]);
        arr=row[day];
        
        if(!checkIfSeatsAvailable(arr,seats)){
            res.send("SEATS NOT FOUND");
            return ;
        }
        else {
            for(let i=0;i<seats.length;i++)
            arr.splice(arr.indexOf(seats[i]),1);
            row[day]=arr;
            db.run(`UPDATE auditoriums SET Slot_${new Array("A","B","C")[JSON.parse(slot-1)]}="${JSON.stringify(row)}" WHERE Auditorium="${audi}" `,
            (error)=>{if(error) console.log(error)});
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
            
            emailTicket(user,seats,movie,new Array("9 AM","2 PM","7 PM")[JSON.parse(slot)],date);
        }
    });
};

module.exports=submitFinalTicket;