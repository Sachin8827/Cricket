// import mongoose from 'mongoose';

// const teamSchema = new mongoose.Schema({
//     name : {
//         type : String,
//         trim : true
//     },
//     ownerName : {
//         type : String,
//         trim : true
//     },
//     captain : {
        
//     },
//     players : [
//         {
//             playerId: {
//                 type : mongoose.Schema.Types.ObjectId,
//                 ref : 'Player'
//             }
//         }
//     ]
// });


import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    banner: {
        type: String
    },
    players : [
                {
                    playerId: {
                        type : mongoose.Schema.Types.ObjectId,
                        ref : 'Player'
                    }
                }
            ],
    tournamentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});

const Team = mongoose.model('Team', teamSchema);

export default Team;
