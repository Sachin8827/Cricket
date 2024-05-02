
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import TeamRouter from './routes/team.route.js'
import PlayerRouter from "./routes/player.route.js";
import AdminRouter from "./routes/admin.route.js";
import path from "path";
import organiserRouter from "./routes/organiser.route.js";
import TournamentRouter from './routes/tournament.routes.js';
import {fileURLToPath} from "url";
import PlayingStyleRouter from './routes/playingstyling.route.js'
import MatchRouter from './routes/match.route.js'
import cors from 'cors'
const __filename = fileURLToPath(import.meta.url);
const __dirname =path.dirname(__filename);
const app = express();
app.use(express.static(path.join(__dirname,"public")));
mongoose.connect("mongodb+srv://Sachin:MPIF123@cluster0.rwyjpoi.mongodb.net/cricket")
.then(result=>{
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended : true}));
    app.use("/player",PlayerRouter);
    app.use('/team',TeamRouter)
    app.use("/admin",AdminRouter);
    app.use('/tournament', TournamentRouter)
    app.use("/organiser",organiserRouter);
    app.use('/playingstyle', PlayingStyleRouter)
   app.use('/match', MatchRouter);
    app.listen(3000,()=>{console.log("server started......");})
    
}).catch(err=>{
   
    console.log(err);
})

