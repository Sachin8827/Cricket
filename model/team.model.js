import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true
    },
    ownerName : {
        type : String,
        trim : true
    },
    captain : {
        
    },
    players : [
        {
            playerId: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Player'
            }
        }
    ]
});