"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, BarChart3, Play, Copy, Loader2, Sparkles, Video } from "lucide-react";
import { Navbar } from "@/components/Navbar";

// Dummy Data mimicking the N8N payload
const dummyData = {
    product_context: {
        name: "Lumina Glow Serum",
        category: "Skincare",
        key_benefits: ["Brightening", "Hydrating", "Anti-aging"],
        target_customer: "Women 25-40 looking for natural glow"
    },
    top_trends: [
        {
            trend_name: "Glass Skin Routine",
            why_it_works_for_this_product: "The 'Glass Skin' trend focuses on intense hydration and dewy finish, which aligns distinctively with Lumina Glow's key benefit.",
            evidence_from_dataset: ["Trending #GlassSkin", "High engagement on routine videos"],
            product_specific_hooks: ["Get Glass Skin in 5 minutes", "The secret to my morning glow", "Stop using matte foundation"],
            video_structure: {
                "0_3s": "Close up of dewy skin, tapping cheek.",
                "3_10s": "Showing product texture, applying serum.",
                "10_20s": "Montage of before/after or morning routine steps.",
                "20_30s": "Final look, smiling at camera, CTA to check bio."
            },
            editing_notes: ["Use soft lighting", "Increase exposure slightly", "Lo-fi beat background"],
            caption_templates: ["My daily glass skin routine ✨ #skincare #glassskin"],
            hashtag_strategy: {
                broad: ["skincare", "beauty", "glow"],
                niche: ["glassskin", "kbeauty", "dewy"],
                intent: ["skincareroutine", "glowups"]
            }
        }
    ],
    creator_recipe_json: {
        hook: "If you want glass skin, stop skipping this step.",
        video_style: "Aesthetic Morning Routine (ASMR)",
        caption: "Transform your skin with just 3 drops. ✨ #skincare #glow #morningroutine",
        hashtags: ["#skincare", "#glassskin", "#glow"]
    },
    veo3_prompt: "Cinematic close-up heavily stylized shot of a serum bottle glowing with ethereal light in a modern bathroom, water droplets on the bottle, soft morning sunlight streaming through window, 8k resolution, photorealistic, dewy skin texture."
};

export default function DemoPage() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

    const handleGenerateVideo = async () => {
        setIsGeneratingVideo(true);
        try {
            // In a real scenario, this would call your specific Veo3 generation API
            const res = await fetch("/api/generate-video", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: dummyData.veo3_prompt })
            });

            if (!res.ok) throw new Error("Failed to generate video");

            const data = await res.json();
            setVideoUrl(data.videoUrl); // Assuming API returns { videoUrl: "..." }
        } catch (error) {
            console.error(error);
            // Fallback for demo if API fails or isn't set up
            // Using a placeholder video or error message would be better in prod
            alert("Video generation failed (API mock). In production, this connects to Veo3.");
        } finally {
            setIsGeneratingVideo(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
            <Navbar />
            <div className="pt-24 pb-20 px-6 relative">
                {/* Background blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] -z-10" />

                <div className="max-w-6xl mx-auto space-y-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-4 border border-blue-500/20">
                                <Sparkles className="w-4 h-4" />
                                <span>Demo Mode</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                Viral Strategy: {dummyData.product_context.category}
                            </h1>
                            <p className="text-gray-400">Targeting: {dummyData.product_context.target_customer}</p>
                        </div>
                    </div>

                    {/* Top Trend Spotlight */}
                    <section className="space-y-6">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <TrendingUp className="text-indigo-400" />
                            Top Viral Opportunity
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 p-8 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 backdrop-blur-sm">
                                <div className="mb-6">
                                    <h3 className="text-3xl font-bold text-white mb-2">{dummyData.top_trends[0].trend_name}</h3>
                                    <p className="text-indigo-200 text-lg leading-relaxed">{dummyData.top_trends[0].why_it_works_for_this_product}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Product Angles</h4>
                                        <ul className="space-y-2">
                                            {dummyData.top_trends[0].product_specific_hooks.map((hook, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-gray-200">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                                                    "{hook}"
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                        <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Hashtags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {dummyData.top_trends[0].hashtag_strategy.niche.concat(dummyData.top_trends[0].hashtag_strategy.intent).slice(0, 6).map((tag, i) => (
                                                <span key={i} className="text-xs bg-white/5 px-2 py-1 rounded text-blue-300">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 h-full flex flex-col">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Play size={18} className="text-purple-400" />
                                        Video Structure
                                    </h3>
                                    <div className="space-y-4 flex-1">
                                        {Object.entries(dummyData.top_trends[0].video_structure).map(([time, desc], i) => (
                                            <div key={i} className="relative pl-6 border-l-2 border-white/10">
                                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-600 border border-[#050505]" />
                                                <span className="text-xs font-mono text-indigo-400 block mb-1 uppercase">{time.replace('_', '-')}</span>
                                                <p className="text-sm text-gray-300">{desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Creator Recipe (Actionable) */}
                    <section className="grid md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10">
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold">1</span>
                                Ready-to-Post Script
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Hook</label>
                                    <div className="text-xl font-medium text-white mt-1">"{dummyData.creator_recipe_json.hook}"</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 block">Caption</label>
                                    <p className="text-gray-300 italic mb-4">{dummyData.creator_recipe_json.caption}</p>
                                    <div className="flex flex-wrap gap-2 text-xs text-blue-400">
                                        {dummyData.creator_recipe_json.hashtags.map((t, i) => <span key={i}>{t}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-500/20 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] -z-10" />

                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold">2</span>
                                AI Video Generator (Veo3)
                            </h2>

                            <div className="space-y-4">
                                <p className="text-indigo-200 text-sm">
                                    We've constructed a cinematic prompt for Gemini Veo3 based on this strategy.
                                </p>
                                <div className="p-4 bg-black/40 rounded-xl border border-indigo-500/30 text-sm text-gray-300 font-mono leading-relaxed h-32 overflow-y-auto custom-scrollbar">
                                    {dummyData.veo3_prompt}
                                </div>

                                {!videoUrl ? (
                                    <button
                                        onClick={handleGenerateVideo}
                                        disabled={isGeneratingVideo}
                                        className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                        <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/20 bg-black relative">
                                            <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
                                        </div>
                                        <button
                                            onClick={() => setVideoUrl(null)}
                                            className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
                                        >
                                            Generate Another
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
