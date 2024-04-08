
import Player from '../model/player.model.js';

const updatePlayerProfile = async (req, res) => {
  try {
    const playerId = req.params.playerId;
    const updatedFields = req.body;

    
    const player = await Player.findByIdAndUpdate(playerId, updatedFields, { new: true });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.json({ message: 'Player profile updated successfully', player });
  } catch (error) {
    console.error('Error updating player profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { updatePlayerProfile };
