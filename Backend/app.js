const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./DB/connectToDB");
const path = require("path");

const _dirname = path.resolve();

app.use(cors({
    origin: ["https://code-reviewver.onrender.com", "http://localhost:5000"], 
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"], 
    methods: ["GET", "POST", "PUT", "DELETE"], 
}));

connectToDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const AIroutes = require("./Routes/AIroutes");
const userRoutes = require("./Routes/userRoutes");

app.use("/ai", AIroutes);
app.use("/user", userRoutes);

app.use(express.static(path.join(_dirname, "Frontend", "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "Frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
