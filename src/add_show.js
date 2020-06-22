
const Auditoriums=require("../Databases/auditoriums_collection.js");
const Movies=require("../Databases/movies_collection.js");

const addShow=function(movie,audi,poster,res){

    Movies.findOneAndUpdate(
        {Audi:audi},
        {
            Movie_name:movie,
            Audi:audi,
            Poster_src:poster
        },
        {upsert:true,new:true,runValidators:true}
    ).then((doc)=>{
        //console.log(doc);
    }).catch((error)=>{
        console.log(error);
    });

    Auditoriums.findOneAndUpdate(
        {Auditorium:audi.substr(audi.length-1)},
        {
            Auditorium:audi.substr(audi.length-1),
            Movie:movie
        },
        {upsert:true,new:true,runValidators:true}
    ).then((doc)=>{
        //console.log(doc);
    }).catch((error)=>{
        console.log(error);
    })

    res.status(200).send("OK");
}

module.exports=addShow;