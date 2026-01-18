const fetch = require('node-fetch');

// Small 1x1 pixel red GIF as dummy "video" data
// In reality, this is an image, but the code just treats it as a buffer
const dummyBase64 = "data:video/mp4;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

async function testExport() {
    console.log("Testing Export to Drive + Sheets...");

    try {
        const res = await fetch('http://localhost:3000/api/export-to-sheets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                videoUrl: dummyBase64,
                caption: "Test Caption from Script",
                hashtags: ["#Test", "#API"]
            })
        });

        const data = await res.json();
        console.log("Response Status:", res.status);
        if (res.ok) {
            console.log("✅ Success!");
            console.log("Drive Link:", data.driveLink);
        } else {
            console.error("❌ Failed:", JSON.stringify(data, null, 2));
        }

    } catch (e) {
        console.error("Script Error:", e);
    }
}

testExport();
