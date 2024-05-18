import Match from '../model/matchresult.model.js'
import Point from '../model/point.model.js';

export const insertScore = async (request, response, next) =>{
    let {tournamentId,teamBattingFirst,teamBattingSecond,firstTeamScore,secondTeamScore,firstTeamOvers,secondTeamOvers} = request.body;
    let result = firstTeamScore > secondTeamScore ? "TeamA" : secondTeamScore > firstTeamScore ? "TeamB" : "Tied"
    let teamFirstPoint  = result =='TeamA' ? 2 :  result=='TeamB' ? 0 :1 
    let teamSecondPoint = result =='TeamB' ? 2 : result=='TeamA'?  0 : 1
    let teamFirstNetRunRate = calculateNetRunRate(firstTeamScore,firstTeamOvers, secondTeamScore,secondTeamOvers);
    let teamSecondNetRunRate = calculateNetRunRate(secondTeamScore,secondTeamOvers, firstTeamScore,firstTeamOvers);

    try {
        const firstTeamMatches = await Match.find({ 
            $or: [
                { teamBattingFirst: teamBattingFirst, teamBattingSecond: teamBattingSecond },
                { teamBattingFirst: teamBattingSecond, teamBattingSecond: teamBattingFirst }
            ]
        });
        if(firstTeamMatches.length > 0){
            return response.status(201).json({result : 'Both team Played Mactches already'})
        }
        let insertedData = await Match.create({tournamentId, teamBattingFirst, teamBattingSecond, firstTeamScore, secondTeamScore, firstTeamOvers, secondTeamOvers, result});
        let updateFirstTeamPoints = await Point.updateOne({tournamentId, teamId : teamBattingFirst}, {
            $inc : {matchesPlayed : 1, win : result=='TeamA' ? 1 : 0,loss :  result=='TeamA' ? 0 : 1, points : teamFirstPoint, netRunRate : teamFirstNetRunRate}
        })
        let updateSecondTeamPoints = await Point.updateOne({tournamentId,teamId : teamBattingSecond},{
            $inc : {matchesPlayed : 1, win : result=='TeamB' ? 1 : 0,loss :  result=='TeamB' ? 0 : 1, points : teamSecondPoint, netRunRate : teamSecondNetRunRate}
        
        })
    
        if(updateFirstTeamPoints.modifiedCount && updateSecondTeamPoints.modifiedCount){
            return response.status(200).json({result : "Points updated in both table"})
        }
        return response.status(201).json({result : "Points not updated"})
    
    } catch (error) {
        console.log(error)
        return response.status(201).json({result : "Internal server error"})
    
    }
}

function calculateNetRunRate(runsScored, oversFaced, runsConceded, oversBowled) {
    
    const nrrFor = (runsScored / oversFaced) - (runsConceded / oversBowled);
    return nrrFor.toFixed(2); // Return NRR rounded to 2 decimal places
}