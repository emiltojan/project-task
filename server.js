var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var app = express();
var task = require('./server/routes/task.router');
var config = require('./server/config/database');

var port = 3000;

mongoose.connect(config.uri, (err) =>{
    if(err){
        console.log('Could not connect to database');
    } else{
        console.log('Connection to database successful');  
    }
});

app.use(express.static(path.join(__dirname,'src')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api',task);
app.get('*', function(req,res){
    res.sendFile('index.html');
});

app.listen(port, function(){
    console.log("Server started at port:" + port);
});