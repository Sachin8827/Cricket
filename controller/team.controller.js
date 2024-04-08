import Team from '../model/team.model.js';

// Create a new team application for a tournament
export const applyForTournament = async (req, res, next) => {
    try {
        const teamData = req.body;
        const team = await Team.create(teamData);
        res.status(201).json({ message: "Team application submitted successfully", team });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
