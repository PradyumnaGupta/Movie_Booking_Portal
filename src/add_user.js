
const addUser=function(user,pass,email,phone,res) {
    const db=require("./database_initializer.js");
    const passwordHash=require("password-hash");
    
    let hashedPassword = passwordHash.generate(pass);
    
    db.run('INSERT INTO users (Username,Password,Email,Phone_no) VALUES ($user,$pass,$email,$phone)',{
        $user:user,
        $pass:hashedPassword,
        $email:email,
        $phone:phone
    },function(error){
        if(error){
            //console.log("Duplicate account not allowed.");
            res.send("Account with this username already exists.");
        }
        else 
        res.send("OK");
    });
    
};

module.exports=addUser;