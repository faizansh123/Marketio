const { GoogleGenerativeAI } = require("@google/generative-ai");

async function run() {
    const apiKey = "AIzaSyCvz_icAVuFSJMVw0TNqRJs8oh3IYlsF_k";
    const genAI = new GoogleGenerativeAI(apiKey);

    // Create a dummy model to access the client, although listModels might be on the client directly?
    // Actually, checking docs (or common usage), listModels is usually on a manager or we have to just guess.
    // The Node SDK doesn't always expose listModels easily on the main entry point in older versions, 
    // but let's try a different model name first which is safer: "gemini-pro"

    // Let's try "gemini-pro" first as a fallback test.
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = "Hello";
        const result = await model.generateContent(prompt);
        console.log("gemini-pro worked!");
    } catch (e) {
        console.log("gemini-pro failed:", e.message);
    }

    // Let's try "gemini-1.5-flash-001"
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
        const prompt = "Hello";
        const result = await model.generateContent(prompt);
        console.log("gemini-1.5-flash-001 worked!");
    } catch (e) {
        console.log("gemini-1.5-flash-001 failed:", e.message);
    }
}

run();
