const mongoose=require("mongoose");

//default 50 seat matrix for 3 days --add more 1d array for more days
let defaultSeatMatrix=[ [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
                        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
                        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50]
                    ];

const auditoriumsSchema=new mongoose.Schema({
    Auditorium:{
        type:String,
        required:true,
        unique:true
    },
    Movie:{
        type:String
    },
    Slot_A:{
        type:Array,
        required:true,
        default:defaultSeatMatrix,
    },
    Slot_B:{
        type:Array,
        required:true,
        default:defaultSeatMatrix,
    },
    Slot_C:{
        type:Array,
        required:true,
        default:defaultSeatMatrix,
    }
});

module.exports=mongoose.model("Auditoriums",auditoriumsSchema);