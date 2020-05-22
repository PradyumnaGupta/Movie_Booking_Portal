
const getMoviesInfo=function(res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');

    db.all("SELECT * FROM movies",(error,rows)=>{
        res.send(rows);
    })
}

module.exports=getMoviesInfo;