const Movies=require("../Databases/movies_collection.js");

const getMoviesInfo=function(res){

    Movies.find({}).then((doc)=>{
        //console.log(doc);
        res.status(200).send(doc)
    }).catch((error)=>{
        res.status(500).send();
    });

}

module.exports=getMoviesInfo;