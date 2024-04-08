import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name : {
        type : String
    },
    ownerName : {
        type : String
    },
    captain : {
        type : String
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

const Team = mongoose.model('team', teamSchema);
export default Team;
