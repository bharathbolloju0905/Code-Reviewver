const express = require("express");
const dotenv = require("dotenv");
dotenv.config() ;
const PORT = process.env.PORT ;
const app = express();
const cors = require("cors");
app.use(cors(
    {
        origin: "http://localhost:5000",
        credentials: true
    }
));
const AIroutes = require("./Routes/AIroutes") ;
const userRoutes = require("./Routes/userRoutes");
const cookieParser = require("cookie-parser");
const {connectToDB} = require("./DB/connectToDB");
const path = require("path");
connectToDB() ;
app.use(cookieParser());
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;
const __dirname = path.resolve();

app.use("/ai",AIroutes) ;
app.use("/user",userRoutes);


app.get("/",(req,res)=>{
    res.redirect("/user");
})
app.use(express.static(path.join(__dirname, "Frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend","dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`"Server is running on port ${PORT}"`);
});