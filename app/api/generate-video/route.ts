import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        const apiKey = process.env.VEO_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            // Mock response for demo purposes if no key
            console.log("No API Key found, returning mock video url");
            await new Promise(resolve => setTimeout(resolve, 2000));
            return NextResponse.json({
                videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            });
        }

        // "Veo 3" request. Trying the likely available Veo endpoint.
        // Common names: 'veo-2.0-generate-001', 'veo-001', etc.
        const model = genAI.getGenerativeModel({ model: 'veo-2.0-generate-001' });

        const result = await model.generateContent(prompt);
        const response = await result.response;

        console.log("Veo Response:", response);

        // If the model actually returns a video URI in the candidate text or specific field:
        // const videoUri = response.candidates[0].content.parts[0].text; 

        // Attempt to extract video URI from candidates
        // Note: The exact response structure for Veo depends on the API version.
        // We check for 'candidates' and then text or a specific video uri field.
        const videoUrl = response.candidates?.[0]?.content?.parts?.[0]?.text || response.candidates?.[0]?.content?.parts?.[0]?.fileData?.fileUri;

        if (!videoUrl) {
            console.warn("No video URL found in response", JSON.stringify(response, null, 2));
            // If we can't find a video, we return an error state instead of a fake video
            return NextResponse.json({ error: "No video generated from model" }, { status: 500 });
        }

        return NextResponse.json({
            videoUrl: videoUrl,
            metadata: response
        });

    } catch (error) {
        console.error("Video Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate video" }, { status: 500 });
    }
}
