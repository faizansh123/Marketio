import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 300; // Allow 5 minutes for generation

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const apiKey = process.env.VEO_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            });
        }

        const ai = new GoogleGenAI({ apiKey });

        console.log("Starting Veo generation with @google/genai SDK...");

        // Use user's configuration
        let operation = await ai.models.generateVideos({
            model: 'veo-3.1-generate-preview',
            prompt: prompt,
            config: {
                numberOfVideos: 1,
                aspectRatio: '9:16',
                durationSeconds: 8, // Matching prompt's request
                personGeneration: 'allow_all', // Using string enum or types.PersonGeneration.ALLOW_ALL if available
                resolution: '720p',
            },
        });

        console.log("Operation started:", operation.name);

        // Polling loop
        while (!operation.done) {
            console.log(`Video ${operation.name} generating... waiting 5s`);
            await new Promise((resolve) => setTimeout(resolve, 5000));
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
        return NextResponse.json({ error: error.message || "Failed to generate video" }, { status: 500 });
    }
}
