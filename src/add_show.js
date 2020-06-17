
const Auditoriums=require("../Databases/auditoriums_collection.js");
const Movies=require("../Databases/movies_collection.js");

const addShow=function(movie,audi,poster,res){
    
    let newMovie=new Movies({
        Movie_name:movie,
        Audi:audi,
        Poster_src:poster
    });

    Movies.findOneAndUpdate(
        {Audi:audi},
        newMovie,
        {upsert:true,new:true,runValidators:true}
    ).then((doc)=>{
        //console.log(doc);
    }).catch((error)=>{
        console.log(error);
    });

    let auditorium=new Auditoriums({
        Auditorium:audi.substr(audi.length-1),
        Movie:movie
    });

    Auditoriums.findOneAndUpdate(
        {Auditorium:audi.substr(audi.length-1)},
        auditorium,
        {upsert:true,new:true,runValidators:true}
    ).then((doc)=>{
        //console.log(doc);
    }).catch((error)=>{
        console.log(error);
    })

    res.status(200).send("OK");
}

module.exports=addShow;