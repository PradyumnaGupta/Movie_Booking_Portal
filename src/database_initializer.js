

const sqlite=require('sqlite3');
const Database=new sqlite.Database('../Databases/MBP.db');

module.exports=Database;