
const getMoviesInfo=function(res){
    
    const db=require("./database_initializer.js");

    db.all("SELECT * FROM movies",(error,rows)=>{
        if(error)
        console.log(error);

        res.send(rows);
    })
}

module.exports=getMoviesInfo;