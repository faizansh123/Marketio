const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
let apiKey = '';
try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const veoMatch = envContent.match(/VEO_API_KEY=(.*)/);
    const geminiMatch = envContent.match(/GEMINI_API_KEY=(.*)/);

    if (veoMatch) {
        apiKey = veoMatch[1].trim();
    } else if (geminiMatch) {
        apiKey = geminiMatch[1].trim();
    }
    apiKey = apiKey.replace(/^["']|["']$/g, '');
} catch (e) {
    console.error("Could not read .env.local", e);
}

if (!apiKey) {
    console.error("No API Key found");
    process.exit(1);
}

async function testVeo() {
    console.log("Testing Veo for key: " + apiKey.substring(0, 5) + "...");

    // Try Method 1: generateContent (Standard)
    // URL: https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:generateContent
    try {
        console.log("\nAttempt 1: generateContent");
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "A cinematic drone shot of a futuristic city" }] }]
            })
        });
        const data = await resp.json();
        console.log("Status:", resp.status);
        if (resp.ok) {
            console.log("SUCCESS:", JSON.stringify(data, null, 2));
        } else {
            console.log("ERROR:", JSON.stringify(data, null, 2));
        }
    } catch (e) { console.error(e); }

    // Try Method 2: predict (Vertex style, but on AI Studio?)
    try {
        console.log("\nAttempt 2: predict");
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/veo-3.1-generate-preview:predict?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                instances: [{ prompt: "A cinematic drone shot of a futuristic city" }],
                parameters: { sampleCount: 1 }
            })
        });
        const data = await resp.json();
        console.log("Status:", resp.status);
        if (resp.ok) {
            console.log("SUCCESS:", JSON.stringify(data, null, 2));
        } else {
            console.log("ERROR:", JSON.stringify(data, null, 2));
        }
    } catch (e) { console.error(e); }
}

testVeo();
