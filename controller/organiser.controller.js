import Organiser from "../model/organiser.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//  http://localhost:3000/organiser/SignIn

//  http://localhost:3000/organiser/register

export const SignIn =async (request,response,next)=>{
    console.log("hello");
    try {
        let {email,password}=request.body;
        let organiser =await Organiser.findOne({email});
        return  organiser ?
        bcrypt.compareSync(password, organiser.password) ? response.status(200).json({ message: "Sign in successs", organiser: { ...organiser.toObject(), password: undefined }, token: generateToken(email) }) : response.status(401).json({ error: "Bad request", message: "Invalid password" })
        : response.status(401).json({ error: "Bad request", message: "Invalid email id" });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}


export const Register = async (request,response,next)=>{
    try{
        const errors =validationResult(request);
        if(!errors.isEmpty()) return response.status(401).json({error:"Bad request",errorMessage:errors.array()})
        let password = request.body.password;
        let saltKey = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, saltKey);
        request.body.password = password;
        let result = await Organiser.create(request.body);
        result = result.toObject();
        delete result.password;
        return response.status(200).json({message:"registration success",organiser: result});
    }catch(err){
        console.log(err);
        return response.status(500).json({error:"Internal server error"});
    }

}
 export const Update = async (request,response,next)=>{
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ error: "Bad Request", errorMessage: errors.array() });
        const { name, email, mobile } = request.body;
        const result = await Organiser.updateOne({ name: name }, { $set: { email: email, mobile: mobile } });
        if (result.nModified === 0) {
            return response.status(404).json({ error: "Not Found", message: "No matching organizer found for update" });
        }
        return response.status(200).json({ message: "Update success" });
    } catch (error) {
         console.log(error);
         return response.staus(500).json({error:"Internal Server Error "});
     }
 }
const generateToken = (email) => {
    let payload = { subject: email };
    return jwt.sign(payload, "reruerffdhffjvxcxmvbvbeoirukfjhkf");
}