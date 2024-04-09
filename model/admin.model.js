import moongose from "mongoose";

const adminSchema= new moongose.Schema({
    name :{
        type : String,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique : true
    },
    password:{
        type:String,
        trim:true
    },
    mobile:{type:String}
},{
    versionKey:false
});
const admin=moongose.model("Admin",adminSchema);
export default admin;
