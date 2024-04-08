import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import organiserRouter from "./routes/organiser.route.js";
const app=express();

mongoose.connect("mongodb://localhost:27017/cricketDB")
.then (result=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
   
    app.use("/organiser",organiserRouter);
    
    app.listen(3000,()=>{
        console.log("server is started....");
    })
}).catch (err=>{
    console.log(err);
})

                     