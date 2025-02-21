const express = require("express");
const router = express.Router();
const authenicate = require("../controllers/authencatationControllers") ;

router.post("/register",authenicate.registerController) ;
router.post("/login",authenicate.loginController) ;
router.get("/logout",authenicate.logoutController) ;


module.exports = router ; 