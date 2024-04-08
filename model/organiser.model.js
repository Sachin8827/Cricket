import mongoose from 'mongoose';

const organiserSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
    },
    email : {
        type : String,
        trim : true
    },
    mobile : {
        type : String,
    },
    tournaments : [
        {
            tournamentId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Tournament'
            }
        }
    ],
    password : {
        type : String
    }
});

const Organiser = mongoose.model('Organiser', organiserSchema);
export default Organiser;