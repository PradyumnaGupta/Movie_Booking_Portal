const dailyAudiTableUpdate=function(){
    
    const db=require("./database_initializer.js");
    
    console.log("Performing daily table update ....")

    let new_seats=[],arr;
    for(let i=1;i<=50;i++){
        new_seats.push(i);
    }

    db.all("SELECT * FROM auditoriums",(error,rows)=>{
        if(error)
        console.log(error);

        rows=rows.map((val)=>{
            
            arr=JSON.parse(val.Slot_A);
            arr.splice(0,1);
            arr.push(new_seats);
            val.Slot_A=JSON.stringify(arr);

            arr=JSON.parse(val.Slot_B);
            arr.splice(0,1);
            arr.push(new_seats);
            val.Slot_B=JSON.stringify(arr); 

            arr=JSON.parse(val.Slot_C);
            arr.splice(0,1);
            arr.push(new_seats);
            val.Slot_C=JSON.stringify(arr);

            db.run(`UPDATE auditoriums SET SLOT_A="${val.Slot_A}",SLOT_B="${val.Slot_B}",SLOT_C="${val.Slot_C}" WHERE Auditorium="${val.Auditorium}"`,
            (error)=>{
                if(error)
                console.log(error);
            });
            return val;
        });
    });
    setTimeout(dailyAudiTableUpdate,24*60*60*1000);
}

module.exports=dailyAudiTableUpdate;