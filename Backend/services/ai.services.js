const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGlE_GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

async function generateContent(req, res) {
    const code = req.body.code;
    if(!code) {
        res.status(400).json({ message: "Code is required" });
        T
        return;
    }
    const result = await model.generateContent(code);
    res.json(result.response.text());
}

module.exports = { generateContent };