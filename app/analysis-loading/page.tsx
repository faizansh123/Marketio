"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface AnalysisResult {
    product_context: {
        name: string;
        category: string;
        key_benefits: string[];
        target_customer: string;
    };
    top_trends: any[]; // relaxed type for loading page as we don't display deeply
    creator_recipe_json: any;
    veo3_prompt: string;
}

function LoadingContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const niche = searchParams.get("niche");
    const product = searchParams.get("product");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
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

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 30) return prev + 2;
                if (prev < 70) return prev + 0.5;
                if (prev < 95) return prev + 0.1;
                return prev;
            });
        }, 200);

        const triggerWorkflow = async () => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 1800000); // 30 mins

                const res = await fetch("/api/workflow", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ niche, product }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!res.ok) throw new Error("Failed to start workflow");

                let data = await res.json();

                if (Array.isArray(data) && data.length > 0) {
                    data = data[0];
                }

                localStorage.setItem("analysisResult", JSON.stringify(data));

                setStatus("success");
                setProgress(100);

                router.push("/results");

            } catch (error) {
                console.error("Workflow Error:", error);
                setStatus("error");
            } finally {
                clearInterval(interval);
            }
        };

        triggerWorkflow();

        return () => clearInterval(interval);
    }, [niche, product, router]);

    return (
        <div className="min-h-screen bg-[#050505] text-white p-6 relative overflow-x-hidden">
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

            {status === "success" && (
                <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
                    <h1 className="text-3xl font-bold text-white">Analysis Complete!</h1>
                    <p className="text-gray-400">Redirecting to results...</p>
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
