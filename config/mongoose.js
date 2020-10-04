const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/codeial-dev');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"error connnecting to the Mongodb"));
db.once('open',function(){
    console.log("connecting to database ::Mongodb");
    
})
module.exports=db;