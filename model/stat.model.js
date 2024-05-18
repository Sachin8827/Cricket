import mongoose from 'mongoose'

const StatSchema = new mongoose.Schema({
    
        playerId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Player'
        },
        totalMatches : {
            type : Number,
            default : 0
        },
        totalRuns  : {
            type : Number,
            default : 0
        },
        totalWickets : {
            type : Number,
            default : 0
        },
        totalCatches : {
            type : Number,
            default : 0
        }
    
});

const Stat = mongoose.model('Stat', StatSchema);
export default Stat;