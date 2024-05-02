import mongoose from "mongoose"
const matchSchema = new mongoose.Schema({
    tournamentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',  
        required: true
    },
    teamBattingFirst: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',  
        required: true
    },
    teamBattingSecond: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',  
        required: true
    },
    firstTeamScore: {
        type: Number,
        required: true
    },
    secondTeamScore: {
        type: Number,
        required: true
    },
    firstTeamOvers: {
        type: Number,
        required: true,
        default: 0  
    },
    secondTeamOvers: {
        type: Number,
        required: true,
        default: 0  
    },
    date: {
        type: Date,
        required: true, 
        default: Date.now  
    },
    result: {
        type : String,
        required : true
    }
});


const Match = mongoose.model('Match', matchSchema);

export default Match;
