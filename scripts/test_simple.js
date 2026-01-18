async function run() {
    console.log("Sending request...");
    try {
        const res = await fetch("http://localhost:3000/api/export-to-sheets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                videoUrl: "data:video/mp4;base64,AAAA",
                caption: "DEBUG CAPTION",
                hashtags: ["#Debug"]
            })
        });
        const text = await res.text();
        console.log("Status:", res.status);
        console.log("Body:", text);
    } catch (e) {
        console.error("Fetch Error:", e);
    }
}
run();
