
const addShow=function(movie,audi,poster,res){
    const db=require("./database_initializer.js");
    
    db.run(`INSERT OR REPLACE INTO movies VALUES("${movie}","${audi}"," ${poster}")`);
    db.run(`INSERT OR REPLACE INTO auditoriums(Auditorium,Movie) VALUES("${audi.substr(audi.length-1)}","${movie}")`);
    res.send("OK");
}

module.exports=addShow;