
const Users=require("../Databases/users_collection.js");
const passwordHash=require("password-hash");

const checkUser=function(user,pass,res){
    Users.findOne({
        Username:user
    }).then((doc)=>{
        
        if(doc&&doc.Username===user&&passwordHash.verify(pass,doc.Password)){
            if(doc.Admin===true)
            res.status(200).send("Admin");
            else 
            res.status(200).send("Authentication Successful");
        }
        else res.status(404).send();
    }).catch((error)=>{
        console.log(error);
    });

}

module.exports=checkUser;