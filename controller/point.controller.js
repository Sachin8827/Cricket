import Point from "../model/point.model.js";

export const getPoints = async (request, response, next) => {
    try {
        let id = request.params.id;
        console.log(id);
        let points = await Point.find({ tournamentId: id }).populate("teamId");
        console.log(points);
        return response.status(200).json({ result: points });
    } catch (error) {
        console.log(error)
        return response.status(500).json({ error: "Internal server error" });
    }
};