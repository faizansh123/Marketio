import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        console.log("Debug: API Key present?", !!apiKey);

        if (!apiKey) {
            console.error("Gemini API Key is missing from environment variables");
            return NextResponse.json({ error: "Gemini API Key missing" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const body = await req.json();
        const { product_context, trend } = body;

        console.log("Debug: Payload received:", {
            hasProduct: !!product_context,
            hasTrend: !!trend
        });

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are an expert viral short-form content creator and UGC scriptwriter for TikTok and Instagram Reels.
Using the provided product and viral trend strategy, generate a high-converting UGC video script.

STRICT OUTPUT FORMAT RULES:
- Do NOT use Markdown tables.
- Use the exact "Scene Block" format below.
- Use **Bold** for the labels (Visual, Audio, Text Overlay).

Required Format Example:

**SCENE 1 (0–3s)**
**Visual:** [Describe action/visuals]
**Audio:** [Dialogue or Voiceover]
**Text Overlay:** [Text on screen]

**SCENE 2 (3–8s)**
... (and so on)

Product Info:
${JSON.stringify(product_context, null, 2)}

Viral Strategy/Trend to Use:
${JSON.stringify(trend, null, 2)}

Requirements:
- Length: 30-45 seconds.
- Tone: Authentic, high-energy, "Creator Recipe" vibes.
- Include a strong hook, clear value prop, and CTA.
`;

        const result = await model.generateContent(prompt);
        const script = result.response.text();

        return NextResponse.json({ script });

    } catch (error) {
        console.error("Script Generation Error:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
