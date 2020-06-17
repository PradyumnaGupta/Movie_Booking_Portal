
const Users=require("../Databases/users_collection.js");

const addUser=function(user,pass,email,phone,res) {

    const passwordHash=require("password-hash");
    
    let hashedPassword = passwordHash.generate(pass);

    let newUser=new Users({
        Username:user,
        Password:hashedPassword,
        Email:email,
        Phone_no:phone,
    });

    newUser.save()
    .then(()=>{
        res.status(200).send("OK");
    })
    .catch((error)=>{
        res.status(409).send("Account with this username already exists.");
    });

};

module.exports=addUser;