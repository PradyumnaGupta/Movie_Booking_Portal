
const checkUser=function(user,pass,res){
    
    const db=require("./database_initializer.js");
    const passwordHash=require("password-hash");

    if(user==="admin@amazon"&&pass==="admin@123"){
        res.send("Admin");
        return;
    }

    db.get('SELECT * FROM users WHERE Username=$user',{
        $user:user,
    },(error,row)=>{
        if(error)
        console.log(error);

        if(row&&row.Username===user&&passwordHash.verify(pass,row.Password))
        res.status(200).send("Authentication Successful");
        
        else res.status(404).send();
    });
}

module.exports=checkUser;