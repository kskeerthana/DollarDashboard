const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

const app = express();
var cors = require('cors');

var port = process.env.PORT || 8000;

mongoose.connect("mongodb://127.0.0.1:27017/",{useNewUrlParser:true});
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(express.static(__dirname + "/public"));
app.listen(port);
console.log(`App started at port ${port}`);

mongoose.connection.on('open',function(err){
    if(err){
        console.log("DB error");
        console.log(err);
    }
    else{
        console.log("connection established");
    }
})
mongoose.connection.on('error',function(err) {
    console.log("DB error");
    console.log(err);
});

const transactionRouter = require("./routes/transactionRouter");
app.use("/api/transaction",transactionRouter);

app.use("/api/user",require('./routes/userRoutes'));

module.exports = app;