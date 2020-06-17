
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
        Slot_A:new_seats_matrix,
        Slot_B:new_seats_matrix,
        Slot_C:new_seats_matrix
    },
    {multi:true}
).catch((error)=>{
    console.log(error);
});