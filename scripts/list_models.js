const fs = require('fs');
const path = require('path');
// fetch is available in Node 18+

const envPath = path.resolve(__dirname, '../.env.local');
let apiKey = '';
try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    // Try VEO_API_KEY first, then GEMINI_API_KEY
    const veoMatch = envContent.match(/VEO_API_KEY=(.*)/);
    const geminiMatch = envContent.match(/GEMINI_API_KEY=(.*)/);

    if (veoMatch) apiKey = veoMatch[1].trim();
    else if (geminiMatch) apiKey = geminiMatch[1].trim();
    apiKey = apiKey.replace(/^["']|["']$/g, '');
} catch (e) { }

if (!apiKey) { console.error("No API key"); process.exit(1); }

async function listmodels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("\n--- Available Models Metadata ---");
            const veoModels = data.models.filter(m => m.name.toLowerCase().includes('veo'));
            if (veoModels.length > 0) {
                veoModels.forEach(m => console.log(JSON.stringify(m, null, 2)));
            } else {
                console.log("NO VEO MODELS FOUND.");
            }
        }
    } catch (e) { console.error(e); }
}

listmodels();
