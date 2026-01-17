"use client";

import { motion } from "framer-motion";
import { Search, BarChart3, Target, Brain, Wand2, Zap } from "lucide-react";

const features = [
    {
        title: "Competitor Analyzer",
        description: "AI watches your rivals to outperform them, not just copy them.",
        icon: Search,
        className: "col-span-1 md:col-span-4",
    },
    {
        title: "Trend Lifecycle Prediction",
        description: "Know if a trend is rising 🚀, peaking 🔥, or saturated 🧊 before you post.",
        icon: BarChart3,
        className: "col-span-1 md:col-span-2",
    },
    {
        title: "Goal-Based Campaigns",
        description: "Optimize for followers, sales, or clicks. The AI adjusts hook intensity accordingly.",
        icon: Target,
        className: "col-span-1 md:col-span-2",
    },
    {
        title: "Brand Memory",
        description: "The agent learns your visual style and tone over time.",
        icon: Brain,
        className: "col-span-1 md:col-span-4",
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm mb-4">
                        <Zap className="w-4 h-4" />
                        <span>AI Differentiation</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Not Just A Tool, <br /> It's An <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Intelligent Agent</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors backdrop-blur-sm group ${feature.className}`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-indigo-400">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}

                    {/* Visual Style Preset (Small distinct feature) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="col-span-1 md:col-span-6 p-8 rounded-3xl bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-purple-400 font-semibold uppercase tracking-wider text-sm">
                                <Wand2 size={16} />
                                <span>Scroll-Stopping Quality</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white">Cinema-Grade Output</h3>
                            <p className="text-gray-400 max-w-xl">
                                Automatic subtitles, emotional emoji syncing, and visual style presets (MrBeast, Luxury, UGC) ensures your content feels native and high-budget.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {/* Mock Presets */}
                            <div className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-gray-300 text-sm">MrBeast Style</div>
                            <div className="px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/50 text-indigo-300 text-sm">Minimal Luxury</div>
                            <div className="px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-gray-300 text-sm">TikTok UGC</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
