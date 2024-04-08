
import PlayingStyle from '../model/PlayingStyle.model.js';
import Player from '../model/player.model.js';

export const addPlayingStyle = async (req, res) => {
  try {
    const { playerId, battingHand, bowlingArm, battingPosition, bowlingStyle } = req.body;

    
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

   
    const newPlayingStyle = new PlayingStyle({
      playerId,
      battingHand,
      bowlingArm,
      battingPosition,
      bowlingStyle
    });

    
    await newPlayingStyle.save();

   
    player.playingStyle = newPlayingStyle._id;
    await player.save();

    res.json({ message: 'Playing style added successfully', playingStyle: newPlayingStyle });
  } catch (error) {
    console.error('Error adding playing style:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


