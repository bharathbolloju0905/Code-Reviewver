const userMOdel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports.registerController=async (req,res)=>{
    try{
        const {username,email,password} = req.body ;
        if(!username || !email || !password){
            return res.status(400).json({error:"Please fill all the fields"});
        }
        if(password.length<6){
            return res.status(400).json({error:"Password should be atleast 6 characters long"});
        }

       const salt = bcrypt.genSaltSync(10);
       const hashedPassword = bcrypt.hashSync(password,salt);
         const newUser = await userMOdel.create({
              username,
              email,
              password:hashedPassword
         });
        
         const token = await jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        res.cookie("token",token,{httpOnly:true});
         newUser.password = undefined;
        return res.status(201).json({message:"User Created Successfully",user:newUser});
    }
    catch(err){
        console.log("registerControllerError",err);
        return res.status(500).json({error:"Internal Server Error"});
    }
};

module.exports.loginController = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await userMOdel.findOne({email:email});
        if(!user){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        if(!email || !password){
            return res.status(400).json({error:"Please fill all the fields"});
        }
        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});
        res.cookie("token",token,{httpOnly:true});
        user.password = undefined;
        return res.status(201).json({message:"User Created Successfully",user:user});
    }
    catch(err){
        console.log("loginController error",err);
        return res.status(500).json({error:"Internal Server Error"});
    }
}

module.exports.logoutController = async (req,res)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({message:"User Logged Out Successfully"});
        
    } catch (error) {
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});   
        
    }
};