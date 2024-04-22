console.log("sachin")
import Team from '../model/team.model.js';
import Player from "../model/player.model.js";
import Transporter from '../mail/mail.js'
import Tournament from '../model/tournament.model.js';

export const applyForTournament = async (request, response, next) => {
    let {tournamentId, teamId} = request.body;
    try {
        let tournament = await Tournament.findOne({_id : tournamentId});
        let team = await Team.findOne({_id : teamId});
        console.log(tournament)
        console.log(team)
        let status = tournament.tournamentTeams.some((team) => team.teamId == teamId);

        if(status)
            return response.status(201).json({result : "Already joined tournament"});

        tournament.tournamentTeams.push({teamId});
        let join = await tournament.save();
        team = await Team.updateOne({_id : teamId},{
            isRegisterd : true,
            tournament : tournamentId
        });
        console.log(team);

        response.status(200).json({result : 'tournament joins success', status : join})
    } catch (error) {
        console.log(error);
    }
};

export const createTeam = async (request, response, next) =>{
    
    try {
        let {name, captain, personalPlayer} = request.body;
        let player = await Player.findOne({_id : captain});
        if(player.joinStatus)
            return response.status(201).json({result : 'Already joined Team'});
        let team = await Team.create(request.body);
        if(team)
        {
            let result = await Player.updateOne({_id : player._id},{
                $set :{
                    joinStatus : true,
                    team : team._id
                }
            });
            return response.status(200).json({result : result});
        }
        return response.status(200).json({result : "team not created"});
        
    } catch (error) {
        console.log(error)
        return response.status(500).json({error : "Internal server error"});
    }
}

export  const viewTeam  = async (request, response, next) =>{
    try {
        let id = request.params.id;
        let team = await Team.findOne({_id : id}).populate('captain');
        return response.status(200).json({result : team});
    } catch (error) {
        console.log(error)
        return response.status(500).json({error : "Internal server error"});
    }
}

export const teamList = async (request, response, next) =>{
    try{
        let teams  = await Team.find();
        return response.status(200).json({result : teams});
    }
    catch(error){
        console.log(error)
        return response.status(500).json({error : "Internal server error"});
    }
}

export const sendRequest = async (request, response, next) =>{
    let {playerId, teamId} = request.body;
    try {
        let player = await Player.findOne({_id : playerId});
        if(player.joinStatus)
            return response.status(201).json({result : "Player already joined a team"});

        let status = player.requestedTeam.some((team) => teamId==team.teamId);
        if(status)
            return response.status(201).json({result : "Already request sent"});
                 
        player.requestedTeam.push({teamId});
        player.save();
        return response.status(200).json({result : "request sent to Player", player : player});
    } catch (error) {
        console.log(error);
        return response.status(500).json({error : "Internal server error"});
    }
}

export const trailRequest = async (request, response, next) =>{
    let {email} = request.body;
    let player = Player.findOne({email});
    if(player){
        let obj = {
            from: 'sb360879@gmail.com',
            to: email,
            subject: 'Mail regarding trial Request',
            text: 'Hey '+player.name+" you are invited to for trail request "
        };
        Transporter.sendMail(obj, (error, info) =>{
            return error ? response.status(500).json({error : "Internal server error"}) : response.status(200).json({result: 'email sent'})
        })
    }
}
export const getUserRequest = async(request, response, next) =>{
    let {teamId}  = request.body;
    try {
        let team =  await Team.findOne({_id : teamId}).populate('reqestedPlayers.playerId');
        return response.status(200).json({result : team})
    } catch (error) {
        console.log(error);
        return response.status(500).json({error : "Internal server error"});
    }
    

}
export const removePlayer = async (request, response, next) =>{
    let {teamId, playerId} = request.body;
    try {
        let team = await Team.findOne({_id : teamId});
        if(!team)
            return response.status(201).json({result : "Team not found"});
        if(!team.isRegisterd){
                await team.updateOne({_id : teamId},{
                    $pull : {
                        players : {playerId}
                    }
                });
                return response.status(201).json({result : 'Player removed'})
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json({error : "Internal server error"});
    }
}