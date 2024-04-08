
import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({
    organiserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Organiser'
    },
    name : {
        type : String,
        trim :true
    },
    address :{
        type : String,
        trim : true
    },
    teamLimit : {
        type : Number
    },
    deadLine :{
        type : Date
    },
    startDate : {
        type : Date
    },
    endDate :{
        type : Date
    },
    tournamentTeams :[
        {
            teamId : mongoose.Schema.Types.ObjectId,
            ref : 'Team'
        }
    ],
    firstPrize : {
        type : Number
    },
    secondPrize :{
        type : Number
    },
    thirdPrize : {
        type : Number
    },
    entryFees :{
        type : Number
    },
    format : {
        type : Number
    }
}) ;
const Tournament  = mongoose.model('Tournament', tournamentSchema);
export default Tournament;
