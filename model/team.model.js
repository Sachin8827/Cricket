


import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    banner : {
        type : String,
        trim  : true
    },
    
    captain : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Player'
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
    playedTournament :[
        {
            tournamentId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Tournament'
            }
        }
    ],
    tournament : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Tournament"
    },
    reqestedPlayers : [
        {
            playerId :{
                type : mongoose.Schema.Types.ObjectId,
                ref : "Player"
            }
        }
    ]

});

const Team = mongoose.model('Team', teamSchema);

export default Team;
