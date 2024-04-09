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
        const tournaments = await Tournament.find();
        res.status(200).json({ tournaments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
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


// export const getTournaments = async (request, response, next) => {
//     try {
//         const tournaments = await Tournament.find();
//         return response.status(200).json({ tournaments });
//     } catch (error) {
//         return response.status(500).json({ error: "Internal Server Error" });
//     }
// };
