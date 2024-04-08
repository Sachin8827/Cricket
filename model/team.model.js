import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name : {
        type : String
    },
<<<<<<< HEAD
    ownerName : {
        type : String
=======
    banner : {
        type : String,
        trim  : true
>>>>>>> c612c0aeef76c4f6e62ee49ceefaa3b66d0d1ad1
    },
    
    captain : {
<<<<<<< HEAD
        type : String
=======
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Player'
>>>>>>> c612c0aeef76c4f6e62ee49ceefaa3b66d0d1ad1
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

const Team = mongoose.model('team', teamSchema);
export default Team;
