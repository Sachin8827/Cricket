
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import playerRoutes from './routes/player.route.js';
import playingStyleRoutes from './routes/playingstyling.route.js';
import tournamentRoutes from './routes/tournament.routes.js';
import teamRoutes from './routes/team.routes.js';

const app = express();



mongoose.connect('mongodb://localhost:27017/cricket') //
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
   

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/playing-styles', playingStyleRoutes);
app.use('/api', tournamentRoutes);
app.use('/api', teamRoutes);

// Start the server
app.listen(3000, () => {
  console.log(`Server is running `);
});
