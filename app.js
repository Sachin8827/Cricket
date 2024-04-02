import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import PlayerRouter from './routes/player.route.js'

const app = express();

mongoose.connect('mongodb://localhost:27017/cricket')
.then(result =>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/player', PlayerRouter);

    app.listen(3000, () =>{
        console.log("Server started");
    })
})
.catch();