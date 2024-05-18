import Admin from "../model/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ExcelJS from 'exceljs'
import Stat from "../model/stat.model.js";


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
export const updateScore = async (request, response) => {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile('../output.xlsx'); // Path to your .xlsx file

        const worksheet = workbook.getWorksheet('Sheet1'); // Assuming data is in 'Sheet1'

        worksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber > 1) { // Skip header row
                const _id = row.getCell(1).value;
                if (!_id) {
                    return; // Stop processing if _id is empty (end of data)
                }

                const trimmedId = _id.substring(1, _id.length - 1); // Trim whitespace from _id

                const totalMatches = row.getCell(3).value*1;
                const totalRuns = row.getCell(4).value*1;
                const totalWickets = row.getCell(5).value*1;
                const totalCatches = row.getCell(6).value*1;

                console.log('Updating stats for player with ID:', trimmedId);

                // Check if player with _id exists in the Stat collection
                const existingPlayer = await Stat.findOne({ _id: trimmedId }).populate('playerId');
                console.log(existingPlayer)
                if (existingPlayer) {
                    // Update player's stats
                    let data = await Stat.updateOne(
                        { _id: trimmedId },
                        { totalMatches, totalRuns, totalWickets, totalCatches }
                    );
                    console.log(data)
                    console.log('Player stats updated successfully');
                } else {
                    console.log('Player not found for ID:', trimmedId);
                }
            }
        });
    
        return response.status(200).json({ result: 'Scores updated successfully' });
    } catch (error) {
        console.error('Error updating scores:', error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};

const generateToken=(email)=>{
    let payload={subjecct:email};
    return jwt.sign(payload,"dgjkajkjajgkjagjkadminuiuo");
}

