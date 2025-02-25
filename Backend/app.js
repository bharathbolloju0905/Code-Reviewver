const express = require("express");
const dotenv = require("dotenv");
dotenv.config() ;
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
app.use(cors({
    origin: ["https://code-reviewver.onrender.com", "http://localhost:5000"], 
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"], 
    methods: ["GET", "POST", "PUT", "DELETE"], 
}));



const AIroutes = require("./Routes/AIroutes") ;
const userRoutes = require("./Routes/userRoutes");
const cookieParser = require("cookie-parser");
const {connectToDB} = require("./DB/connectToDB");
const path = require("path");
connectToDB() ;
app.use(cookieParser());
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;




app.use("/ai",AIroutes) ;
app.use("/user",userRoutes);



app.use(express.static(path.join(__dirname, "../Frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
});


app.listen(PORT, () => {
    console.log(`"Server is running on port ${PORT}"`);
});