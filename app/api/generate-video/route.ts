import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 300; // Allow 5 minutes for generation

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const apiKey = process.env.VEO_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.warn("No API Key found. Returning mock video.");
            return NextResponse.json({
                videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            });
        }

        // Initialize SDK
        const ai = new GoogleGenAI({ apiKey });

        console.log("Starting Veo generation with @google/genai SDK (v1beta)...");

        // Use configuration from Python script
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-generate-preview',
            prompt: prompt,
            config: {
                date: '2025-01-22', // Optional: Lock version if needed, but SDK usually handles
                numberOfVideos: 1,
                aspectRatio: '9:16',
                durationSeconds: 8,
                personGeneration: 'ALLOW_ALL', // Matching Python uppercasing
                resolution: '720p', // Matching Python string
            },
        });

        console.log("Operation started:", operation.name);

        // Polling loop
        while (!operation.done) {
            console.log(`Video ${operation.name} generating... waiting 10s`);
            await new Promise((resolve) => setTimeout(resolve, 10000)); // 10s wait as in Python script
            operation = await ai.operations.getVideosOperation({
                operation: operation,
            });
        }

        console.log(`Generated ${operation.response?.generatedVideos?.length ?? 0} video(s).`);

        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!videoUri) {
            throw new Error("Generation complete but no video URI returned.");
        }

        // Fetch the video content securely on the server
        console.log("Fetching video content from:", videoUri);
        const videoRes = await fetch(`${videoUri}&key=${apiKey}`);

        if (!videoRes.ok) {
            throw new Error(`Failed to download video content: ${videoRes.status}`);
        }

        const videoBuffer = await videoRes.arrayBuffer();
        const base64Video = Buffer.from(videoBuffer).toString('base64');
        const dataUrl = `data:video/mp4;base64,${base64Video}`;

        return NextResponse.json({
            videoUrl: dataUrl,
            metadata: operation.response
        });

    } catch (error: any) {
        console.error("Video Generation Error:", error);

        // CHECK FOR QUOTA LIMITS (429 / RESOURCE_EXHAUSTED)
        // If the API says "quota exceeded", we return a MOCK video so the user's flow isn't broken.
        if (
            error.code === 429 ||
            error.status === 'RESOURCE_EXHAUSTED' ||
            error.message?.includes('quota') ||
            error.message?.includes('429') ||
            error.message?.includes('RESOURCE_EXHAUSTED')
        ) {
            console.warn("Quota exceeded (429). Falling back to MOCK video for demo purposes.");
            return NextResponse.json({
                // Return a reliable test MP4 (Google's "ForBiggerJoyrides" standard test video)
                videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
                mock: true,
                note: "Quota exceeded, returning mock video"
            });
        }

        return NextResponse.json({ error: error.message || "Failed to generate video" }, { status: 500 });
    }
}
