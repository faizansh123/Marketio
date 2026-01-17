"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle, TrendingUp, Hash, Play, Copy } from "lucide-react";

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

function LoadingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const niche = searchParams.get("niche");
    const product = searchParams.get("product");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [progress, setProgress] = useState(0);

    // Dynamic Loading Text based on progress
    const loadingText = progress < 30 ? "Initializing Agent..."
        : progress < 60 ? "Analyzing Market Trends..."
            : progress < 85 ? "Structuring Viral Strategy..."
                : "Finalizing Report...";

    useEffect(() => {
        if (!niche) {
            setStatus("error");
            return;
        }

        // Smart Progress Simulation
        // Starts fast, then slows down significantly to accommodate long load times (up to 2-3 mins)
        const interval = setInterval(() => {
            setProgress((prev) => {
                // Fast up to 30%
                if (prev < 30) return prev + 2;
                // Medium up to 70%
                if (prev < 70) return prev + 0.5;
                // Very slow crawl up to 95% (the "counter act" for long waits)
                if (prev < 95) return prev + 0.1;
                return prev;
            });
        }, 200);

        const triggerWorkflow = async () => {
            try {
                // Set a reasonable client-side timeout (e.g., 4 mins) just in case
                // This aborts the CLIENT request, even if server is still running
                const controller = new AbortController();
                // 240,000ms = 4 minutes
                const timeoutId = setTimeout(() => controller.abort(), 240000);

                const res = await fetch("/api/workflow", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ niche, product }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!res.ok) throw new Error("Failed to start workflow");

                const data = await res.json();

                setResult(data);
                setStatus("success");
                setProgress(100);
            } catch (error) {
                console.error(error);
                setStatus("error");
            } finally {
                clearInterval(interval);
            }
        };

        triggerWorkflow();

        return () => clearInterval(interval);
    }, [niche, product]);

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 relative overflow-x-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] -z-10" />

            {status === "loading" && (
                <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-lg mx-auto text-center space-y-8">
                    <div className="relative w-full">
                        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ type: "spring", stiffness: 50 }}
                            />
                        </div>
                        <div className="mt-4 flex justify-between text-xs text-gray-500 font-mono">
                            <span>{loadingText}</span>
                            <span>{Math.floor(progress)}%</span>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
                            Analyzing Market Data
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Comparing <span className="text-white font-semibold">{product || niche}</span> against current viral trends...
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-3 gap-4 w-full mt-8 opacity-50">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-white/5 rounded-xl border border-white/5 animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />
                        ))}
                    </div>
                </div>
            )}

            {status === "success" && result && (
                <div className="max-w-6xl mx-auto space-y-12 pb-20">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm mb-4 border border-green-500/20">
                                <CheckCircle className="w-4 h-4" />
                                <span>Analysis Complete</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                Viral Strategy: {result.product_context.category}
                            </h1>
                            <p className="text-gray-400">Targeting: {result.product_context.target_customer}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => router.push('/')} className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">
                                New Analysis
                            </button>
                            <button className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium transition-colors shadow-lg shadow-indigo-600/20">
                                Download Report
                            </button>
                        </div>
                    </div>

                    {/* Top Trend Spotlight */}
                    {result.top_trends.length > 0 && (
                        <section className="space-y-6">
                            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                                <TrendingUp className="text-indigo-400" />
                                Top Viral Opportunity
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 p-8 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 backdrop-blur-sm">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-bold text-white mb-2">{result.top_trends[0].trend_name}</h3>
                                        <p className="text-indigo-200 text-lg leading-relaxed">{result.top_trends[0].why_it_works_for_this_product}</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                            <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Product Angles</h4>
                                            <ul className="space-y-2">
                                                {result.top_trends[0].product_specific_hooks.map((hook, i) => (
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
                                                {result.top_trends[0].hashtag_strategy.niche.concat(result.top_trends[0].hashtag_strategy.intent).slice(0, 6).map((tag, i) => (
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
                                            {Object.entries(result.top_trends[0].video_structure).map(([time, desc], i) => (
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
                    )}


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
                                    <div className="text-xl font-medium text-white mt-1">"{result.creator_recipe_json.hook}"</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2 block">Caption</label>
                                    <p className="text-gray-300 italic mb-4">{result.creator_recipe_json.caption}</p>
                                    <div className="flex flex-wrap gap-2 text-xs text-blue-400">
                                        {result.creator_recipe_json.hashtags.map((t, i) => <span key={i}>{t}</span>)}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                    <div className="text-sm text-gray-400">
                                        Style: <span className="text-white">{result.creator_recipe_json.video_style}</span>
                                    </div>
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white">
                                        <Copy size={18} />
                                    </button>
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
                                <div className="p-4 bg-black/40 rounded-xl border border-indigo-500/30 text-sm text-gray-300 font-mono leading-relaxed h-48 overflow-y-auto custom-scrollbar">
                                    {result.veo3_prompt}
                                </div>
                                <button className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-xl flex items-center justify-center gap-2">
                                    <Play size={20} fill="currentColor" />
                                    Generate Video Now
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {status === "error" && (
                <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                    <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50 mb-6">
                        <AlertCircle className="w-12 h-12 text-red-400" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Analysis Failed</h1>
                    <p className="text-gray-400 mb-8 max-w-md">We couldn't retrieve the analysis from the agent workflow. This might be due to a timeout or connection issue.</p>
                    <button
                        onClick={() => router.back()}
                        className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white"
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Content...</div>}>
            <LoadingContent />
        </Suspense>
    );
}
