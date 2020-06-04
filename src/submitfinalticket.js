const emailTicket=require('./emailticket.js');
const checkIfSeatsAvailable=require('./utils.js');

const submitFinalTicket=function(user,movie,audi,slot,day,seats,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
    let today=new Date().getDay();
    day=(day<today)?(7-today+day):(day-today);
    db.get(`SELECT Slot_${new Array("A","B","C")[JSON.parse(slot)-1]} FROM auditoriums WHERE Auditorium="${audi}"`,
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
            db.run(`UPDATE auditoriums SET Slot_${new Array("A","B","C")[JSON.parse(slot)-1]}="${JSON.stringify(row)}" WHERE Auditorium="${audi}" `,
            (error)=>{if(error) console.log(error)});
            let date=new Date();
            date=`${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
            
            db.get(`SELECT Ticket_Details FROM booked_tickets WHERE Username="${user}"`,(error,row)=>{
                let current_ticket={
                    Date:date,
                    Movie:movie,
                    Slot:new Array("9 AM","2 PM","7 PM")[JSON.parse(slot)-1],
                    Audi:audi,
                    Seats:seats
                };
                if(!row){
                    let new_user_history=[];
                    new_user_history.push(current_ticket);
                    new_user_history=JSON.stringify(new_user_history);
                    db.run(`INSERT INTO booked_tickets VALUES('${user}','${new_user_history}')`);
                }
                else {
                    row=JSON.parse(row.Ticket_Details);
                    row.push(current_ticket);
                    row=JSON.stringify(row);
                    db.run(`UPDATE booked_tickets SET Ticket_Details='${row}' WHERE Username="${user}"`);
                }
            });
            
            /*
            db.run("INSERT INTO booked_tickets VALUES($user,$date,$movie,$slot,$audi)",{
                $user:user,
                $date:date,
                $movie:movie,
                $slot:new Array("9 AM","2 PM","7 PM")[JSON.parse(slot)-1],
                $audi:audi
            });
            */
            res.send("OK");

            emailTicket(user,seats,movie,new Array("9 AM","2 PM","7 PM")[JSON.parse(slot)-1],audi,date);
        }
    });
};

/*
0|Username|TEXT|0||0
1|Date|TEXT|0||0
2|MOVIE|TEXT|0||0
3|Time_Slot|TEXT|0||0
4|Audi|TEXT|0||0
*/

module.exports=submitFinalTicket;