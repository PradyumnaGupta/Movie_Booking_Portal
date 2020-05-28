
const sqlite=require('sqlite3');
const db=new sqlite.Database('../Databases/MBP.db');

let seats=[],row=[];
for(let i=1;i<=50;i++){
    row.push(i);
}

seats.push(row);
seats.push(row);
seats.push(row);

db.run(`UPDATE auditoriums SET SLOT_A="${JSON.stringify(seats)}",SLOT_B="${JSON.stringify(seats)}",SLOT_C="${JSON.stringify(seats)}"`,
    (error)=>{
        if(error)
        console.log(error);
    });