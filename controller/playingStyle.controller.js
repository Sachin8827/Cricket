import PlayingStyle from '../model/PlayingStyle.model.js';
import Player from '../model/player.model.js';
import Exceljs from 'exceljs'
import Stat from '../model/stat.model.js';


export const addPlayingStyle = async (req, res) => {
  try {
    const { playerId, battingHand, bowlingArm, battingPosition, bowlingStyle } = req.body;
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    let newPlayingStyle = await PlayingStyle.create(req.body);
    await Player.updateOne({_id: playerId}, {
      $set: {
        playingStyle: newPlayingStyle._id
      }
    });
    let stat = await Stat.findOne({playerId});
    if(stat){
      return res.status(201).json({error : 'one user cannot have 2 stats'});
    }

    let statData = await Stat.create({ playerId });
    player.stats = statData._id;
    await player.save();
    const filePath = '../output.xlsx';
    let workbook = new Exceljs.Workbook();
    try {
          await workbook.xlsx.readFile(filePath);
    } catch (readError) {
          workbook = new Exceljs.Workbook();
    }
    const workSheet = workbook.getWorksheet('Sheet1') || workbook.addWorksheet('Sheet1');
    const newRow = [statData._id,player.name,0 ,0 ,0 ,0];    
    if (workSheet.actualRowCount === 0) {
          workSheet.addRow(['statId', 'Name', 'Total Matches', 'Total Runs', 'Total Wickets', 'Total Catches'], 1);
    }
    workSheet.addRow(newRow);
    await workbook.xlsx.writeFile(filePath);
    console.log('File updated successfully');
          res.json({ message: 'Playing style added successfully', playingStyle: newPlayingStyle });
  } catch (error) {
    console.error('Error adding playing style:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
