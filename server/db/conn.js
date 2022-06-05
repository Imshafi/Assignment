const mongoose  = require('mongoose');
const con = mongoose.connect("mongodb://localhost:27017/booking",{
            useNewUrlParser : true,
            useUnifiedTopology : true
        }).then(()=>{
            console.log("connection success")
        }).catch((err)=>{
            console.log(err)
        })
module.exports = con;