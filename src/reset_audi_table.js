const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/MBP")
.then(()=>{console.log("Connected to Database...")})
.catch((error)=>{console.log(error)});

const Auditoriums=require("../Databases/auditoriums_collection.js");

let new_seats_matrix=[],seats=[];
for(let i=1;i<=50;i++){
    seats.push(i);
}

new_seats_matrix.push(seats);
new_seats_matrix.push(seats);
new_seats_matrix.push(seats);

Auditoriums.updateMany(
    {},
    {
        $set:{'Slot_A':new_seats_matrix,
        'Slot_B':new_seats_matrix,
        'Slot_C':new_seats_matrix
        }
    },
    {multi:true,new:true}
).then((doc)=>{
    console.log(doc);
}).catch((error)=>{
    console.log(error);
});