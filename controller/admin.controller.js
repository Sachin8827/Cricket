import Admin from "../model/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signIn= async(request,response,next)=>{
    try{
        let {email,password}=request.body;
        let admin =await Admin.findOne({email});
        return admin ?
        bcrypt.compareSync(password,admin.password)?response.status(200).json({message :"SignIn Successfully ",admin:{...admin.toObject(),password:undefined},token : generateToken(email)}):response.status(401).json({error:"Invalid request",message:"Invalid Password"}):response.status(500).json({error:"Internal Server Error"}) ;   
    }
    catch(err){
        console.log(err);
        return response.status(500).json({error:"Internal server Error"});
    }
};
export const signUp= async (request,response,next)=>{
    try {
    let password=request.body.password;
    let saltkey= bcrypt.genSaltSync(10);
    let enc= bcrypt.hashSync(password,saltkey);
    request.body.password=enc;
    let result = await Admin.create(request.body);
    result=result.toObject();
    delete result.password;
    return response.status(200).json({message:"signup success",player:result});
    } 
    catch (err) {
    console.log(err);
    return response.status(500).json({error:"Internal server error"});
    }
}

export const profile=(request,response,next)=>{
    let id=request.params.id;
    console.log(id);
    Admin.findOne({_id:id}).then(result=>{
        return response.status(200).json({admin : result});
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({error: "Internal server error"});
    })
}
export const updateProfile =async (request,response,next)=>{
    let Id=request.params.id;
    let admin = await Admin.findOne({_id:Id},{_id:0}) 
    if(admin){
        let {name,email,contact}=request.body
        await Admin.updateOne({_id:Id},{
            $set:{name,email,contact}
        }).then(result=>{
            if(result.modifiedCount)
                return response.status(200).json({message: "Profile Update Successfully " });
            return response.status(401).json({message :" Bad request(Id not found)"});
        }).catch(err=>{
            console.log(err);
            return response.status(500).json({err});
        })
    }
}

const generateToken=(email)=>{
    let payload={subjecct:email};
    return jwt.sign(payload,"dgjkajkjajgkjagjkadminuiuo");
}

