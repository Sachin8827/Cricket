
import transporter from '../mail/mail.js';
import Team from '../model/team.model.js'
import Player from '../model/player.model.js';


export const retrievePassword = (request, response, next) =>{
    let email  = request.body.email;
    Player.findOne({email})
    .then(result =>{
        otp = generateOTP();
        let obj = {
            from: 'sb360879@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: 'your otp is '+otp
        };
        transporter.sendMail(obj, (error, info) =>{
            return error ? response.status(500).json({error : "Internal server error"}) : response.status(200).json({result: 'email sent'})
        })
    })
    .catch(error =>{
        console.log(error);
        response.status(500).json({error : 'Internal server error'});
    })
}
export const verfiyOTP = (request, response, next) =>{

}
export const acceptRequest = (request, response, next) =>{
    let {playerId, teamId} = request.body;
    
    Player.updateOne({ _id: playerId }, {
            $set: {

                joinStatus: true,
            }
        })
        .then(async result => {
            console.log(result);

            const team = await Team.findOne({
                _id: teamId
            });
            if (!team)
                return response.status(404).json({ message: "Team Not Found" });
            team.players.push(playerId)
            team.save()
                .then(result => {
                    console.log(result);
                    Player.updateOne({ _id: playerId },{
                        $set  : {
                            team : teamId
                        }
                    })
                        .then(result => {
                            return response.status(201).json({ message: "success" });
                        })
                        .catch(err => {
                            return response.status(500).json({ message: "Internal Server Error" });
                        });
                })
                .catch(err => {
                    console.log(err);
                    return response.status(500).json({ message: "Internal Server Error" });
                });

        })
        .catch(err => {
                console.log(err);
                return response.status(500).json({ message: "Internal Server Error" })
            })
}
export const rejectRequest = (request, response, next) => {
    let {playerId, teamId} = request.body;
    Player.updateOne({ _id: playerId }, {
            $pullAll: {
                requestedTeam: [
                    { _id: teamId }
                ]
            }
        })
        .then(result => {

            if (result.modifiedCount)
                return response.status(202).json({ message: "Success" });
            else
                return response.status(404).json({ message: "Not Found" })
        })
        .catch(err => {
                console.log(err);
                return response.status(500).json({ message: "Internal Server Error" })
            }

        )

};

function generateOTP() {
    
    return Math.floor(100000 + Math.random() * 900000);
}
export const getAllPlayer = async (request, response, next) =>{
    try {
        let players = await Player.find();
        return response.status(200).json({result : players});

    } catch (error) {
        return response.status(500).json({error : "Internal server error"});
    }

}

export const getPlayerInfo = async (request, response, next) =>{
    try{
        let id  = request.params.id;
        let player = await Player.findOne({_id : id}).populate('stats').populate('playingStyle');
        return response.status(200).json({result : player});
    }
    catch(error){
        return response.status(500).json({error : "Internal server error"});
    }


}

