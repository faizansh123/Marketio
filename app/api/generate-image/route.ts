import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Gemini API Key missing" }, { status: 500 });
        }

        const { product_context, trend } = await req.json();

        const ai = new GoogleGenAI({ apiKey });

        const prompt = `
Create a high-quality, professional social media advertisement image for the product: "${product_context.name}".
Context:
Category: ${product_context.category}
Key Benefits: ${product_context.key_benefits.join(', ')}
Target Audience: ${product_context.target_customer}
Visual Style & Trend:
Trend Name: "${trend.trend_name}"
The image should align with this viral trend concept: "${trend.why_it_works_for_this_product}".
It should be visually striking, high-resolution, and look like a native social media content or a polished ad.
`;

        const modelName = 'gemini-2.5-flash-image';

        const config = {
            responseModalities: ['IMAGE', 'TEXT'] as any,
            imageConfig: {
                aspectRatio: '4:5',
            },
        };

        const result = await ai.models.generateContent({
            model: modelName,
            config: config,
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        });

        // Extract image
        // The result structure varies. Let's inspect.
        const candidates = result.candidates;
        if (!candidates || candidates.length === 0) {
            throw new Error("No candidates returned");
        }

        const parts = candidates[0].content?.parts;
        if (!parts || parts.length === 0) {
            throw new Error("No content parts returned");
        }

        // Find the image part
        const imagePart = parts.find((p: any) => p.inlineData);

        if (!imagePart) {
            throw new Error("No image generated in response");
        }

        if (!imagePart.inlineData) {
            throw new Error("Image part has missing inline data");
        }

        const mimeType = imagePart.inlineData.mimeType;
        const base64Data = imagePart.inlineData.data;

        const dataUrl = `data:${mimeType};base64,${base64Data}`;

        return NextResponse.json({ imageAdUrl: dataUrl });

    } catch (error: any) {
        console.error("Image Generation Error:", error);
        // Quota check logic
        if (
            error.code === 429 ||
            error.status === 'RESOURCE_EXHAUSTED' ||
            error.message?.includes('quota') ||
            error.message?.includes('429') ||
            error.message?.includes('RESOURCE_EXHAUSTED')
        ) {
            console.warn("Quota exceeded (429) for image. Returning mock image.");
            return NextResponse.json({
                imageAdUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop", // Generic placeholder
                mock: true,
                note: "Quota exceeded"
            });
        }
        return NextResponse.json({ error: error.message || "Failed to generate image" }, { status: 500 });
    }
}
