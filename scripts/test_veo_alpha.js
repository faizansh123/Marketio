const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env.local');
let apiKey = '';
try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const veoMatch = envContent.match(/VEO_API_KEY=(.*)/);
    const geminiMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
    if (veoMatch) apiKey = veoMatch[1].trim();
    else if (geminiMatch) apiKey = geminiMatch[1].trim();
    apiKey = apiKey.replace(/^["']|["']$/g, '');
} catch (e) { }

if (!apiKey) process.exit(1);

async function testAlpha() {
    console.log("Testing v1alpha...");

    const models = ['veo-3.1-generate-preview', 'veo-2.0-generate-001'];

    for (const m of models) {
        console.log(`\nTesting MODEL: ${m}`);
        try {
            // Attempt 1: predict on v1alpha
            const url = `https://generativelanguage.googleapis.com/v1alpha/models/${m}:predict?key=${apiKey}`;
            const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    instances: [{ prompt: "A cinematic drone shot of a futuristic city" }],
                    parameters: { sampleCount: 1 }
                })
            });
            const data = await resp.json();
            console.log(`[v1alpha:predict] Status: ${resp.status}`);
            if (!resp.ok) console.log(JSON.stringify(data, null, 2));
            else console.log("SUCCESS!");
        } catch (e) { console.log(e.message); }
    }
}

testAlpha();
