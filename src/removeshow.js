
const removeShow=function(movie,audi,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
    db.run(`DELETE FROM movies WHERE Movie_name="${movie}" AND Audi="${audi}"`);
    db.run(`DELETE FROM auditoriums WHERE Movie="${movie}" AND Auditorium="${audi.substr(audi.length-1)}"`);
    res.send("OK");
}

module.exports=removeShow;