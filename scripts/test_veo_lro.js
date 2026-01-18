const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
let apiKey = '';
try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const veoMatch = envContent.match(/VEO_API_KEY=(.*)/);
    if (veoMatch) apiKey = veoMatch[1].trim();
    else {
        const geminiMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
        if (geminiMatch) apiKey = geminiMatch[1].trim();
    }
    apiKey = apiKey.replace(/^["']|["']$/g, '');
} catch (e) { }

if (!apiKey) process.exit(1);

async function testLRO() {
    console.log("Testing predictLongRunning...");
    const m = 'veo-3.1-generate-preview';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:predictLongRunning?key=${apiKey}`;

    try {
        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                instances: [
                    { prompt: "A cinematic drone shot of a futuristic city" }
                ]
            })
        });
        const data = await resp.json();
        console.log(`Status: ${resp.status}`);
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (e) { console.log(e); }
}

testLRO();
