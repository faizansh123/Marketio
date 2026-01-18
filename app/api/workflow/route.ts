import { NextResponse } from 'next/server';

// Allow workflow to run for up to 30 minutes (1800 seconds)
export const maxDuration = 1800;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { niche, product } = await req.json();
        const workflowUrl = process.env.WORK_FLOW_ID;

        if (!workflowUrl) {
            console.error("WORK_FLOW_ID env var is missing");
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        // 30 minute timeout for the fetch logic
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1800000);

        // Forward the request to N8N
        const response = await fetch(workflowUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ niche, product }),
            signal: controller.signal,
            // @ts-ignore - keepalive is valid but sometimes TS complains in older lib definitions
            keepalive: true
        } as RequestInit); // casting to avoid TS strictness on extended properties if needed

        clearTimeout(timeoutId);

        if (!response.ok) {
            const text = await response.text();
            console.error("N8N Error:", text);
            return NextResponse.json({ error: "Workflow failed" }, { status: response.status });
        }

        const data = await response.json().catch(() => ({ success: true }));
        return NextResponse.json(data);

    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
