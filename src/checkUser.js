
const checkUser=async function(user,pass,res){
    const sqlite=require('sqlite3');
    const db=new sqlite.Database('../Databases/MBP.db');

    if(user==="admin@amazon"&&pass==="admin@123"){
        res.send("Admin");
        return;
    }

    db.get('SELECT * FROM users WHERE Username=$user AND Password=$pass',{
        $user:user,
        $pass:pass
    },(error,row)=>{
        res.send(row);
    });
}

module.exports=checkUser;