
const getSeats=function(audi,slot,day,res){
    const db=require("./database_initializer.js");
    
    let today=new Date().getDay();
    db.get(`SELECT Slot_${new Array("A","B","C")[JSON.parse(slot)-1]} FROM auditoriums WHERE Auditorium="${audi}"`,
    (error,seats)=>{
        if(error){
            console.log(error);
            res.status(500).send();
            return;
        }
        
        day=parseInt(day);
        day=(day<today)?(7-today+day):(day-today);
        seats=JSON.parse(seats[Object.keys(seats)[0]])[day];
        res.send(JSON.stringify(seats));
    });
};

module.exports=getSeats;

