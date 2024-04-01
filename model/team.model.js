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
    ],
    personalPlayers : {
        type : Number,
        default : 0
    },
    isRegisterd :{
        type : Boolean,
        default : false
    },
    tournament : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tournament"
    },

});

const Team = mongoose.model('Team', teamSchema);
export default Team;
