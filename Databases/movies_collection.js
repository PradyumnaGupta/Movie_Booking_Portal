const mongoose=require("mongoose");

const moviesSchema=new mongoose.Schema({
    Movie_name:{
        type:String
    },
    Audi:{
        type:String,
        unique:true
    },
    Poster_src:{
        type:String,
        default:"NA"
    }
});

module.exports=mongoose.model("Movies",moviesSchema);