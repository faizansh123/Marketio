import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
// Note: This requires process.env.GEMINI_API_KEY to be set
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');

export async function POST(req: Request) {
    try {
        const { message, history, type, files } = await req.json();

        // Check for API Key
        if (!process.env.GEMINI_API_KEY) {
            // ==========================================
            // MOCK FALLBACK (If no API Key provided)
            // ==========================================
            console.log("No API Key found, using mock response");
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay

            if (type === 'analysis') {
                const inputLower = message.toLowerCase();
                let nicheTag = "Productivity";
                if (inputLower.includes("coffee")) nicheTag = "Beverage";
                else if (inputLower.includes("saas")) nicheTag = "SaaS";
                else if (inputLower.includes("eco") || inputLower.includes("environment")) nicheTag = "Eco";
                else if (inputLower.includes("fashion") || inputLower.includes("clothes")) nicheTag = "Fashion";
                else if (inputLower.includes("fitness") || inputLower.includes("gym")) nicheTag = "Fitness";

                return NextResponse.json({
                    role: "assistant",
                    content: `Niche: ${nicheTag}`,
                    type: "analysis",
                    data: {
                        niche: nicheTag,
                        trendScore: Math.floor(Math.random() * (98 - 75) + 75),
                        sentiment: "Positive",
                        opportunities: ["Trending audio overlap", "Educational 'How-to' series", "UGC style content"],
                        competitorSaturation: "Medium"
                    }
                });
            } else {
                return NextResponse.json({
                    role: "assistant",
                    content: "I am currently in mock mode because no GEMINI_API_KEY was found. If you add a key, I can answer this question for real!",
                    type: "text"
                });
            }
        }

        // ==========================================
        // REAL GEMINI INTEGRATION
        // ==========================================

        // Use a model that supports JSON generation effectively
        // gemini-flash-latest usually supports vision/images
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        if (type === 'analysis') {
            // Constrain output to JSON using the prompt
            const prompt = `
            Analyze the following product/niche description (and any attached images): "${message}"

            Return a valid JSON object (NO markdown formatting, just the raw JSON string) with the following fields:
            - niche: A SINGLE, specific word categorizing this niche (e.g. "SaaS", "Fashion", "Beverage"). Select the ONE best fit. Do not return multiple options or slash-separated lists.
            - trendScore: A number between 0-100 indicating viral potential.
            - sentiment: "Positive", "Neutral", "Mixed".
            - opportunities: An array of 3 short marketing angles/hooks.
            - competitorSaturation: "Low", "Medium", or "High".
            `;

            // Prepare input parts
            const parts: any[] = [{ text: prompt }];

            if (files && files.length > 0) {
                files.forEach((file: { mimeType: string, data: string }) => {
                    parts.push({
                        inlineData: {
                            mimeType: file.mimeType,
                            data: file.data
                        }
                    });
                });
            }

            const result = await model.generateContent(parts);
            const response = await result.response;
            const text = response.text();

            // Clean up if Gemini returns markdown code blocks
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const data = JSON.parse(cleanText);

            return NextResponse.json({
                role: "assistant",
                content: `# Niche: ${data.niche}`,
                type: "analysis",
                data: data
            });

        } else {
            // General Chat
            // We use 'gemini-flash-latest' which supports systemInstruction
            const chatModel = genAI.getGenerativeModel({
                model: "gemini-flash-latest",
                systemInstruction: "You are a specialized Market Analysis AI called Marketio. Your goal is to help users with marketing strategies, ad hooks, and trend analysis for their specific niche. \n\nContext:\n- You have just identified the user's niche (visible in history as 'Niche: X').\n- Users may ask follow-up questions about these results.\n- IMPORTANT: If the user says you got the niche WRONG, accept their correction immediately, apologize, and provide analysis for the NEW correct niche they specify.\n- Keep answers concise, actionable, and focused on growth/revenue."
            });

            const chat = chatModel.startChat({
                history: history.map((m: any) => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }]
                })),
                generationConfig: {
                    maxOutputTokens: 500,
                },
            });

            const result = await chat.sendMessage(message);
            const response = await result.response;

            return NextResponse.json({
                role: "assistant",
                content: response.text(),
                type: "text"
            });
        }

    } catch (error) {
        console.error("API Error Details:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
    }
}
