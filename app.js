<<<<<<< HEAD
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

                     
=======
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import PlayerRouter from "./routes/player.route.js";
import path from "path";
import TeamRouter from './routes/team.route.js'

import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname =path.dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname,"public")));
mongoose.connect("mongodb://localhost:27017/cricket")
.then(result=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use("/player",PlayerRouter);
    app.use('/team',TeamRouter)
    app.listen(3000,()=>{console.log("server started......");})
    
}).catch(err=>{
    console.log(err);
})
>>>>>>> c612c0aeef76c4f6e62ee49ceefaa3b66d0d1ad1
