import { validationResult } from 'express-validator';
import Tournament from '../model/tournament.model.js';

export const createTournament = async (request, response, next) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad request", errorMessage: errors.array() });

        const tournament = await Tournament.create(request.body);
        console.log('call');
        return response.status(201).json({ message: "Tournament created successfully", tournament });
    } catch (error) {
        console.log(error)
        return response.status(500).json({ error: "Internal Server Error" });
    }
};


export const viewTournaments = async (request, response, next) => {
    try {
        const organizerId = request.params.organizerId;
        const tournaments = await Tournament.find({ organizerId });
        return response.status(200).json({ tournaments });
    } catch (error) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
};


export const viewAllTournaments = async (req, res, next) => {
    try {
       
        const tournaments = await Tournament.find().populate('organiserId');
        return res.status(200).json({ tournaments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateTournament = async (req, res, next) => {
    try {
        const tournamentId = req.params.tournamentId;
        const { startDate, endDate } = req.body;

        const tournament = await Tournament.findById(tournamentId);
        if (tournament.startDate < new Date() || tournament.endDate < new Date()) {
            return res.status(400).json({ error: "Cannot update tournament after it has started or ended" });
        }

         const updatedTournament = await Tournament.findByIdAndUpdate(tournamentId, req.body, { new: true });
        res.status(200).json({ message: "Tournament updated successfully", tournament: updatedTournament });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateSchedule= async (request,response,next)=>{
    let tournamentId =request.params.tid;
    
    let fileName="";
    
    if(request.file)
        fileName=request.file.filename;
        console.log(fileName)
        let tournament = await Tournament.findOne({_id : tournamentId});
        console.log(tournament)
        let currentDate = new Date();
    if (tournament.deadLine < currentDate) {
        console.log("Tournament deadline has passed.");
        let result = await Tournament.updateOne({_id: tournament._id}, {
            $set:{schedule:fileName}
        });
        if(result.modifiedCount){
            return response.status(200).json({result : "Schdule uploaded", data : tournament});
        }
        return response.status(200).json({result : "Bot", data : tournament});
            
    }
        return response.status(201).json({result : "You can upload Schedule after the deadLine"})
    }

export const getTournamentsById = async (request, response, next) => {
    try {
        console.log('called')
        const _id = request.params.tournamentId;
        const tournaments = await Tournament.findOne({_id}).populate('organiserId');
        delete tournaments.organiserId.password;
        return response.status(200).json({ tournaments });
    } catch (error) {
        console.log(error)
        return response.status(500).json({ error: "Internal Server Error" });
    }
};

export const getTournaments = async (request, response, next) => {
    try {
        const tournaments = await Tournament.find().populate('tournamentTeams.teamId');
        console.log(tournaments)
        return response.status(200).json({ tournaments });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
};
