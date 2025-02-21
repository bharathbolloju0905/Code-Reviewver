const express = require("express");
const router = express.Router();
const authenicate = require("../middleware/auth-middleware");
const { generateContent } = require("../services/ai.services");


router.post("/code-review", authenicate.authentiateUser,generateContent);
module.exports = router;