"use client";

import { useState } from "react";
import { 
    CheckCircle, 
    TrendingUp, 
    Play, 
    Loader2, 
    Sparkles, 
    Video, 
    LayoutDashboard,
    Zap,
    MessageSquare,
    Hash
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

// Dummy Data mimicking the N8N payload
const dummyData = {
    "product_context": {
        "name": "High-Performance Wired/Wireless Headsets",
        "category": "Audio Technology",
        "key_benefits": [
            "Immersive Audio",
            "Ultra-Low Latency",
            "Seamless Connectivity",
            "Superior Comfort",
            "Versatile Use (Gaming/Work)"
        ],
        "target_customer": "Gamers, Remote Professionals, Content Creators, Audiophiles"
    },
    "top_trends": [
        {
            "trend_name": "POV: Solving Your Audio Nightmares",
            "why_it_works_for_this_product": "This trend directly addresses common frustrations users experience with inferior headsets (lag, bad mic, discomfort, tangled wires), positioning our product as the ultimate solution.",
            "product_specific_hooks": [
                "POV: You're trying to clutch a game with laggy audio and a crackly mic.",
                "When your wireless headset keeps disconnecting during important work calls...",
                "Tired of uncomfortable headphones that pinch your ears after an hour of gaming?"
            ],
            "video_structure": {
                "0_3s": "Hook: Visually depict a common headset problem (e.g., frustrated gamer, tangled wires).",
                "3_10s": "Amplify the pain point with quick cuts of common headset issues.",
                "10_20s": "Showcase product features solving the problem (e.g., seamless wireless connection).",
                "20_30s": "User enjoying the product, benefits highlighted with text overlays."
            },
            "caption_templates": [
                "Level up your audio game! 🎧 Say goodbye to lag and discomfort. #GameChanger #AudioUpgrade",
                "Is your headset holding you back? 🤔 Experience crystal-clear sound. #TechSolutions"
            ],
            "hashtag_strategy": {
                "niche": ["#LowLatency", "#GamerLife"],
                "intent": ["#BuyNow", "#ShopHeadsets"]
            }
        }
    ],
    "creator_recipe_json": {
        "hook": "Stop scrolling! Your audio game is about to change forever. 🎧",
        "caption": "Experience the difference with our high-performance headsets. Wired or wireless, superior sound is guaranteed. Tap the link to upgrade! #AudioUpgrade",
        "hashtags": ["#GamingHeadset", "#WirelessAudio", "#TechReview"]
    },
    "veo3_prompt": "Generate a dynamic TikTok ad for high-performance wired/wireless headsets. The video should feature quick cuts, showcasing both the sleek design and powerful audio capabilities. Include a 'problem/solution' narrative (e.g., bad old headphones vs. new product) and a 'performance demo' (e.g., gaming sound clarity, clear mic test). Incorporate text overlays highlighting key benefits like 'ultra-low latency' and 'crystal-clear mic'. Use trending, upbeat background music and a clear call to action at the end."
};

export default function DemoPage() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [promptText, setPromptText] = useState(dummyData.veo3_prompt);

    const handleGenerateVideo = async () => {
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

            // --- AUTO-EXPORT TO SHEETS ---
            fetch("/api/export-to-sheets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    videoUrl: data.videoUrl,
                    caption: dummyData.creator_recipe_json.caption,
                    hashtags: dummyData.creator_recipe_json.hashtags
                })
            }).then(r => r.json())
                .then(d => console.log("Auto-export to sheets result:", d))
                .catch(e => console.error("Auto-export failed:", e));
            // -----------------------------
        } catch (error: any) {
            console.error(error);
            alert(`Video generation failed: ${error.message}`);
        } finally {
            setIsGeneratingVideo(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />
            
            <main className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                                <LayoutDashboard size={18} />
                            </span>
                            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                Campaign Overview
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            {dummyData.product_context.category} Strategy
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Targeting: {dummyData.product_context.target_customer}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT COLUMN: Strategy & Insights */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* 1. Viral Opportunity Card */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="p-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <TrendingUp size={20} />
                                </span>
                                <h2 className="text-lg font-semibold">Top Viral Opportunity</h2>
                            </div>
                            
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-2 text-foreground">
                                    {dummyData.top_trends[0].trend_name}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {dummyData.top_trends[0].why_it_works_for_this_product}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-muted/50 rounded-lg p-4">
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3 flex items-center gap-2">
                                        <Zap size={14} /> Winning Hooks
                                    </h4>
                                    <ul className="space-y-3">
                                        {dummyData.top_trends[0].product_specific_hooks.map((hook, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                "{hook}"
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-muted/50 rounded-lg p-4">
                                     <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3 flex items-center gap-2">
                                        <Hash size={14} /> Hashtags
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {dummyData.top_trends[0].hashtag_strategy.niche.concat(dummyData.top_trends[0].hashtag_strategy.intent).map((tag, i) => (
                                            <span key={i} className="text-xs bg-background border border-border px-2 py-1 rounded-md text-muted-foreground font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Video Structure */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                             <div className="flex items-center gap-2 mb-6">
                                <span className="p-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                    <Play size={20} />
                                </span>
                                <h2 className="text-lg font-semibold">Suggested Video Structure</h2>
                            </div>
                            <div className="space-y-4">
                                {Object.entries(dummyData.top_trends[0].video_structure).map(([time, desc], i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-16 shrink-0 text-xs font-mono font-bold text-primary py-1 px-2 bg-primary/5 rounded border border-primary/20 text-center">
                                            {time.replace('_', '-')}
                                        </div>
                                        <p className="text-sm text-muted-foreground pt-0.5">{desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. Script */}
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                             <div className="flex items-center gap-2 mb-6">
                                <span className="p-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400">
                                    <MessageSquare size={20} />
                                </span>
                                <h2 className="text-lg font-semibold">Creator Script</h2>
                            </div>
                            <div className="bg-muted/30 border border-border rounded-lg p-4">
                                <div className="mb-4">
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Hook</span>
                                    <p className="font-medium text-foreground mt-1">"{dummyData.creator_recipe_json.hook}"</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Body & CTA</span>
                                    <p className="text-sm text-muted-foreground mt-1 italic">
                                        {dummyData.creator_recipe_json.caption}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Generator */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-card border border-border rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/5 overflow-hidden">
                                <div className="bg-primary/5 border-b border-border p-4">
                                    <h3 className="font-bold text-foreground flex items-center gap-2">
                                        <Sparkles size={16} className="text-primary" />
                                        AI Video Generator
                                    </h3>
                                </div>
                                
                                <div className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-muted-foreground uppercase">
                                            Prompt Configuration
                                        </label>
                                        <textarea
                                            value={promptText}
                                            onChange={(e) => setPromptText(e.target.value)}
                                            className="w-full h-40 p-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Edit the prompt above to fine-tune your video generation.
                                        </p>
                                    </div>

                                    {!videoUrl ? (
                                        <button
                                            onClick={handleGenerateVideo}
                                            disabled={isGeneratingVideo}
                                            className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isGeneratingVideo ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={18} />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <Video size={18} />
                                                    Generate Video
                                                </>
                                            )}
                                        </button>
                                    ) : (
                                        <div className="space-y-4 animate-in fade-in zoom-in duration-300">
                                            <div className="rounded-lg overflow-hidden border border-border bg-black aspect-[9/16] relative shadow-md">
                                                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                                            </div>
                                            
                                            <div className="flex items-center gap-2 text-xs text-green-600 bg-green-500/10 px-3 py-2 rounded-md border border-green-500/20">
                                                <CheckCircle size={14} />
                                                <span>Auto-exported to Google Sheets</span>
                                            </div>

                                            <button
                                                onClick={() => setVideoUrl(null)}
                                                className="w-full py-2.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground font-medium text-sm transition-colors"
                                            >
                                                Generate New Version
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
