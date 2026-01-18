"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { CheckCircle, TrendingUp, Play, Copy, Loader2, Video, Sparkles, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";

// This interface matches the provided JSON structure
interface AnalysisResult {
    product_context: {
        name: string;
        category: string;
        key_benefits: string[];
        target_customer: string;
    };
    top_trends: {
        trend_name: string;
        why_it_works_for_this_product: string;
        evidence_from_dataset: string[];
        product_specific_hooks: string[];
        video_structure: {
            "0_3s": string;
            "3_10s": string;
            "10_20s": string;
            "20_30s": string;
        };
        editing_notes: string[];
        caption_templates: string[];
        hashtag_strategy: {
            broad: string[];
            niche: string[];
            intent: string[];
        };
    }[];
    creator_recipe_json: {
        hook: string;
        video_style: string;
        caption: string;
        hashtags: string[];
    };
    veo3_prompt: string;
}

export default function ResultsPage() {
    const router = useRouter();
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [promptText, setPromptText] = useState("");
    const [ugcScript, setUgcScript] = useState<string | null>(null);
    const [isGeneratingScript, setIsGeneratingScript] = useState(false);

    useEffect(() => {
        // Retrieve data from localStorage
        const storedData = localStorage.getItem("analysisResult");
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData)
                setResult(parsed);
                setPromptText(parsed.veo3_prompt);
            } catch (e) {
                console.error("Failed to parse result data", e);
                router.push("/");
            }
        } else {
            // No data found, redirect home
            router.push("/");
        }
    }, [router]);

    const handleGenerateVideo = async () => {
        if (!result) return;
        setIsGeneratingVideo(true);
        try {
            const res = await fetch("/api/generate-video", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: promptText })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to generate video");
            }

            const data = await res.json();
            setVideoUrl(data.videoUrl);
        } catch (error: any) {
            console.error(error);
            alert(`Video generation failed: ${error.message}`);
        } finally {
            setIsGeneratingVideo(false);
        }
    };

    if (!result) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading results...</div>;

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />
            <div className="pt-24 pb-20 px-6 relative">
                {/* Background blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border pb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm mb-4 border border-green-500/20">
                                <CheckCircle className="w-4 h-4" />
                                <span>Analysis Complete</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-2">
                                Viral Strategy: {result.product_context.category}
                            </h1>
                            <p className="text-muted-foreground">Targeting: {result.product_context.target_customer}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => router.push('/')} className="px-6 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors">
                                New Analysis
                            </button>
                            <button className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium transition-colors shadow-lg">
                                Download Report
                            </button>
                        </div>
                    </div>

                    {/* Top Trend Spotlight */}
                    {result.top_trends.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <TrendingUp className="text-indigo-500" />
                                Top Viral Opportunity
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 p-8 rounded-3xl bg-card border border-border shadow-sm">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-bold mb-2">{result.top_trends[0].trend_name}</h3>
                                        <p className="text-muted-foreground text-lg leading-relaxed">{result.top_trends[0].why_it_works_for_this_product}</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        <div className="bg-muted/50 p-4 rounded-xl border border-border">
                                            <h4 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Product Angles</h4>
                                            <ul className="space-y-2">
                                                {result.top_trends[0].product_specific_hooks.map((hook, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                                                        "{hook}"
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="bg-muted/50 p-4 rounded-xl border border-border">
                                            <h4 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Hashtags</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {result.top_trends[0].hashtag_strategy.niche.concat(result.top_trends[0].hashtag_strategy.intent).slice(0, 6).map((tag, i) => (
                                                    <span key={i} className="text-xs bg-background border border-border px-2 py-1 rounded text-primary">#{tag.replace('#', '')}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl bg-card border border-border h-full flex flex-col shadow-sm">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Play size={18} className="text-purple-500" />
                                            Video Structure
                                        </h3>
                                        <div className="space-y-4 flex-1">
                                            {Object.entries(result.top_trends[0].video_structure).map(([time, desc], i) => (
                                                <div key={i} className="relative pl-6 border-l-2 border-border">
                                                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted-foreground border border-background" />
                                                    <span className="text-xs font-mono text-indigo-500 block mb-1 uppercase">{time.replace('_', '-')}</span>
                                                    <p className="text-sm text-muted-foreground">{desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Creator Recipe (Actionable) */}
                    <section className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl bg-secondary/5 border border-border bg-card shadow-sm">
                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold">1</span>
                                Ready-to-Post Script
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Hook</label>
                                    <div className="text-xl font-medium mt-1">"{result.creator_recipe_json.hook}"</div>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-xl border border-border">
                                    <label className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-2 block">Caption</label>
                                    <p className="text-muted-foreground italic mb-4">{result.creator_recipe_json.caption}</p>
                                    <div className="flex flex-wrap gap-2 text-xs text-primary">
                                        {result.creator_recipe_json.hashtags.map((t, i) => <span key={i}>{t}</span>)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-border">
                                    <div className="text-sm text-muted-foreground">
                                        Style: <span className="text-foreground">{result.creator_recipe_json.video_style}</span>
                                    </div>
                                    <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                                        <Copy size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-900/10 to-purple-900/10 border border-indigo-500/20 relative overflow-hidden">

                            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold">2</span>
                                AI Video Generator (Veo3)
                            </h2>

                            <div className="space-y-4">
                                <p className="text-muted-foreground text-sm">
                                    We've constructed a cinematic prompt for Gemini Veo3 based on this strategy.
                                </p>

                                <textarea
                                    value={promptText}
                                    onChange={(e) => setPromptText(e.target.value)}
                                    className="w-full p-4 bg-background/50 rounded-xl border border-border text-sm text-muted-foreground font-mono leading-relaxed h-32 custom-scrollbar resize-none focus:outline-none focus:border-indigo-500/60 transition-colors"
                                />

                                {!videoUrl ? (
                                    <button
                                        onClick={handleGenerateVideo}
                                        disabled={isGeneratingVideo}
                                        className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isGeneratingVideo ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Generating Video...
                                            </>
                                        ) : (
                                            <>
                                                <Video size={20} fill="currentColor" />
                                                Generate Video Now
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="aspect-[9/16] w-full max-w-[320px] mx-auto rounded-xl overflow-hidden border border-border bg-black relative shadow-2xl">
                                            <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                                        </div>
                                        <button
                                            onClick={() => setVideoUrl(null)}
                                            className="w-full py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors"
                                        >
                                            Generate Another
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Detailed Script Generation */}
                    <section className="p-8 rounded-3xl bg-card border border-border shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-pink-500 text-white flex items-center justify-center font-bold">3</span>
                                Detailed Creator Script (Gemini)
                            </h2>
                            {!ugcScript && (
                                <button
                                    onClick={async () => {
                                        if (!result) return;
                                        setIsGeneratingScript(true);
                                        try {
                                            const res = await fetch("/api/generate-ugc-script", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    product_context: result.product_context,
                                                    trend: result.top_trends[0]
                                                })
                                            });

                                            const data = await res.json();

                                            if (!res.ok) {
                                                throw new Error(data.error || "Failed to generate script");
                                            }

                                            if (data.script) setUgcScript(data.script);
                                        } catch (e: any) {
                                            console.error(e);
                                            alert(`Failed to generate script: ${e.message}`);
                                        } finally {
                                            setIsGeneratingScript(false);
                                        }
                                    }}
                                    disabled={isGeneratingScript}
                                    className="px-6 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium transition-colors flex items-center gap-2"
                                >
                                    {isGeneratingScript ? <Loader2 className="animate-spin w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                    Generate Full Script
                                </button>
                            )}
                        </div>

                        {ugcScript ? (
                            <div className="prose prose-invert max-w-none bg-muted/30 p-6 rounded-xl border border-border">
                                <ReactMarkdown>{ugcScript}</ReactMarkdown>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
                                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>Click to generate a second-by-second UGC script customized for this trend.</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}
