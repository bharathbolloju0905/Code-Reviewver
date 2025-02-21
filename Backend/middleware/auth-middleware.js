const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports.authentiateUser = async (req, res , next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({error:"Unauthorized Access"});
        }
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(verifyToken.id).select("-password");
        if(!user){
            return res.status(401).json({error:"Unauthorized Access"});
        }
        req.user = user;
        next();
    }catch(err){
        console.log("authenticateUser Error",err);
        return res.status(500).json({error:"Internal Server Error"});
    }
};