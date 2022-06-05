// importing express module
const express = require('express');

// importing path module
const path = require('path');

// importing body parser
const bodyparser = require('body-parser');

// importing connection with database
const data = require('./server/db/data');

// importing ejs module
const ejs     = require('ejs');

// importing connecting
const con = require('./server/db/conn');  
const { json } = require('express/lib/response');
const { urlencoded } = require('body-parser');


const app     = express();

//using body parser
app.use(bodyparser());
//set view engine is ejs
app.set("view engine","ejs");

// getting css files
app.use("/css",express.static(path.resolve(__dirname,"assets/css")));


// index page
app.get('/',(req,res)=>{
    data.find()
    .then((data)=>{
        res.render('index',{data:data});
    })
    .catch((err)=>{
        res.status(500).send("Unable to fetch data")
    })
    
})
app.post('/update',(req,res)=>{
    var ids = req.body.data;
    if(  !req.body || !req.body.data || !req.body.data.length ){
        res.redirect('/')
    }else{
        var resAr =[];
        for(var i =0; i<ids.length; i++){
            data.updateOne( {_id:ids[i]},{ $set:{status:0}} )
            .then((upd)=>{
                resAr.push(upd.acknowledged);
            })
            .catch((upd_err)=>{
                resAr.push(false);
            })
        }
        res.render('success',{data:resAr})
    }
})
app.get('/update',(req,res)=>{
    res.redirect('/')
})

app.get('/updateToInitial',(req,res)=>{
    data.updateMany( {},{ $set:{status:1}} )
    .then((upd_all)=>{
        res.send(upd_all)
    })
    .catch((upd_all_err)=>{
        res.send(upd_all_err);
    })
})
// insert data
 app.get('/insertToInitial',(req,res)=>{
    var inst_data = {};

    data.insertMany([{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},
                    {status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},
                    {status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},
                    {status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},
                    {status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},
                    {status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},
                    {status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},
                    {status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},{status:0},])
    .then((insert_all)=>{
        res.send(insert_all)
    })
    .catch((insert_all_err)=>{
        res.send(insert_all_err);
    })
}) 

app.listen({port:1000})