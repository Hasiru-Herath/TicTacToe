var Express = require("express");
var Mongoclient= require("mongodb").Mongoclient;
var cor= require("cors");
const multer= require("multer");
const { error } = require("console");
const { Client } = require("undici-types");

var app=Express();
app.use(cors());

var CONNECTION_STRING ="mongodb+srv://21ug0225:GhaSx4OffUmC1nGy@cluster.8cknjqo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"

var DATABASE="userLogin";
var database;

app.listen(5000,()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,Client)=>{
        database=Client.db(DATABASE);
        console.log("Mongo DB Connection Successful");

    })
})