import PlayingStyle from '../model/PlayingStyle.model.js';
import Player from '../model/player.model.js';
import Exceljs from 'exceljs'
import Stat from '../model/stat.model.js';


export const addPlayingStyle = async (req , res) => {
  console.log("Hello");
  try {
    const {playerId} = req.body;
    const player = await Player.findById(playerId);
    if (!player) {
       return res.status(404).json({ message: 'Player not found' });
    }
     console.log(req.body);
     let playingStyle =await PlayingStyle.findOne({playerId});
     if(playingStyle!=null){
       
         return res.status(200).json({message:"You ve already added playing style"});
     }else{
      const newPlayingStyle = new PlayingStyle(req.body);
      console.log(newPlayingStyle);
      await newPlayingStyle.save(); 
      player.playingStyle = newPlayingStyle._id;
      await player.save();
      const stat = await Stat.create({playerId});
      res.status(200).json({ message: 'Playing style added successfully', playingStyle: newPlayingStyle });
    }
  } catch (error) {
    console.error('Error adding playing style:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};