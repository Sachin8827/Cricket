import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true
    },
    age :{
        type : Number,

    },
    email : {
        type : String,
        trim : true,
        unique : true
    },
    mobile : {
        type :  String,
        trim : true
    },
    height : {
        type : Number

    },

    joinStatus  : {
        type : Boolean,
        default : false
    },
    image : {
        type : String
    },
    playerType :{
        type : String,
        trim :  true
    },
    playingStyle : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'PlayingStyle'
    },
    team : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Team',
        default : null 
    },
    stats :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Stat',
        default : null
    },
    password : {
        type : String,
        trim : true
    },
    playedTournament  :[
        {
            tournamentId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Tournament'
            }
        }
    ],
    requestedTeam : [
        {
            teamId :{
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Team'
            }
        }
    ]
    
});

const Player = mongoose.model('Player', playerSchema);
export default Player;