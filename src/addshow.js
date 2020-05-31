
const addShow=function(movie,audi,poster,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');
    db.run(`INSERT OR REPLACE INTO movies VALUES("${movie}","${audi}"," ${poster}")`);
    db.run(`INSERT OR REPLACE INTO auditoriums(Auditorium,Movie) VALUES("${audi.substr(audi.length-1)}","${movie}")`);
    res.send("OK");
}

module.exports=addShow;