const Auditoriums=require("../Databases/auditoriums_collection.js");

const getSeats=function(audi,slot,day,res){
    
    let today=new Date().getDay();

    Auditoriums.findOne({
        Auditorium:audi,
    }).then((doc)=>{

        day=parseInt(day);
        day=(day<today)?(7-today+day):(day-today);//converting weekday to 0/1/2
        
        let seats=doc[`Slot_${new Array("A","B","C")[JSON.parse(slot)-1]}`][day];

        res.status(200).send(JSON.stringify(seats));

    }).catch((error)=>{
        console.log(error);
        res.status(500).send();
    })

};

module.exports=getSeats;

