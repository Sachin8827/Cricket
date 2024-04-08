import mongoose from "mongoose";

const playingStyle = new mongoose.Schema({
    playerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Player'
    },
    battingHand : {
        type : String,
    },
    bowlingArm :{
        type : String
    },
    battingPostion : {
        type : String
    },
    bowlingStyle : {
        type : String
    }
});

const PlayingStyle = mongoose.model('PlayingStyles', playingStyle);
export default playingStyle;