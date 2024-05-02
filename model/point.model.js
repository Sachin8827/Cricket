import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    matchesPlayed: {
        type: Number
    },
    win: {
        type: Number
    },
    loss: {
        type: Number
    },
    points: {
        type: Number
    }, 
    netRunRate : {
        type : Number
    }
});

const Point = mongoose.model('Point', pointSchema);
export default Point;