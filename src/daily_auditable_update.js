const Auditoriums=require("../Databases/auditoriums_collection.js");

const dailyAudiTableUpdate=function(){
    console.log("Performing daily table update ....")

    let total_seats=50;
    let new_seats=[],new_seats_matrix;
    
    for(let i=1;i<=total_seats;i++){
        new_seats.push(i);
    }

    Auditoriums.find({})
    .then((docs)=>{
        docs=docs.map((doc)=>{
            
            new_seats_matrix=doc.Slot_A;
            new_seats_matrix.splice(0,1);
            new_seats_matrix.push(new_seats);
            doc.Slot_A=new_seats_matrix;

            new_seats_matrix=doc.Slot_B;
            new_seats_matrix.splice(0,1);
            new_seats_matrix.push(new_seats);
            doc.Slot_B=new_seats_matrix;

            new_seats_matrix=doc.Slot_C;
            new_seats_matrix.splice(0,1);
            new_seats_matrix.push(new_seats);
            doc.Slot_C=new_seats_matrix;

            Auditoriums.findOneAndUpdate(
                {
                    Auditorium:doc.Auditorium
                },
                {
                    $set:{
                        'Slot_A':doc.Slot_A,
                        'Slot_B':doc.Slot_B,
                        'Slot_C':doc.Slot_C
                    },
                },
                {new:true,runValidators:true}
            ).catch((error)=>{console.log(error)});

            return doc;
        });
    }).catch((error)=>{
        console.log(error);
    });

    setTimeout(dailyAudiTableUpdate,24*60*60*1000);
}

module.exports=dailyAudiTableUpdate;