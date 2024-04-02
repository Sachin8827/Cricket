import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import Player from "../model/player.model.js";
import jwt from "jsonwebtoken";


export const signIn= async(request,response,next)=>{
try{
    let{email,password}=request.body;
    let player=await Player.findOne({email});
    return player ?
    bcrypt.compareSync(password,player.password)?response.status(200).json({message: "signin success",player :{...player.toObject(),password:undefined},token : generateToken(email)}):response.status(401).json({error:"Invalide request",message:"Invalide password"})
    :response.status(500).json({error:"Internal server error"});

}catch(err){
    console.log(err);
    return response.status(500).json({error:"internal server error"});
}
}
const generateToken=(email)=>{
    let payload={subject:email};
    return jwt.sign(payload,"hmaraapnaprojectcrickettournament");
}


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------


export const signUp= async (request,response,next)=>{
    try {
        
    const error =validationResult(request);
    if(!error.isEmpty())
    return response.status(401).json({error:"Invalid request",errorMessage:error.array()});
    let password=request.body.password;
    let saltkey= bcrypt.genSaltSync(10);
    let enc= bcrypt.hashSync(password,saltkey);
    request.body.password=enc;
    let result = await Player.create(request.body);
    result=result.toObject();
    delete result.password;
    let email=request.body.email;
    sendEmail(email);
    return response.status(200).json({message:"signup success",player:result});
    } 
    catch (err) {
    console.log(err);
    return response.status(500).json({error:"Internal server error"});
    }
}

function sendEmail(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'swatibaretha6@gmail.com', 
            pass: 'afcfraroxwzrraqm' 
        }
    });

    const mailOptions = {
        from: 'swatibaretha6@gmail.com',
        to: email,
        subject: 'Sign-up Success Notification',
        text: 'Your sign-up was successful.'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

//--------------------------------------------------------------

export const updateProfile=(request,response,next)=>{
let playerid=request.body._id;
console.log(playerid);
let fileName="";
if(request.file)
    fileName=request.file.filename;

Player.updateOne({_id:playerid},{
    $set:{image:fileName}
}).then(result=>{
        if(result.modifiedCount)
            return response.status(200).json({message:"profile update..."});
        console.log(result);
        return response.status(401).json({error: "Bad request (Id not found)"});  
    }).catch(err=>{
        return response.status(500).json({message: "Internal Server Error"});
    }); 
}
