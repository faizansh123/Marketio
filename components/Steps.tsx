"use client";

import { motion } from "framer-motion";
import { User, Activity, BrainCircuit, Clapperboard, Share2 } from "lucide-react";

const steps = [
    {
        icon: User,
        title: "1. Business Input",
        description: "Tell us your niche, product, and target audience.",
        color: "text-blue-400",
        bg: "bg-blue-400/10",
    },
    {
        icon: Activity,
        title: "2. Trend Analysis",
        description: "AI scans TikTok, Reels, & Shorts for viral patterns.",
        color: "text-pink-400",
        bg: "bg-pink-400/10",
    },
    {
        icon: BrainCircuit,
        title: "3. Strategy Engine",
        description: "Generates hooks, scripts, and visual concepts.",
        color: "text-purple-400",
        bg: "bg-purple-400/10",
    },
    {
        icon: Clapperboard,
        title: "4. AI Video Gen",
        description: "Creates the video using Gemini Veo or advanced composition.",
        color: "text-orange-400",
        bg: "bg-orange-400/10",
    },
    {
        icon: Share2,
        title: "5. Optimization",
        description: "Outputs platform-ready content with captions & tags.",
        color: "text-green-400",
        bg: "bg-green-400/10",
    },
];

export function Steps() {
    return (
        <section id="how-it-works" className="py-24 bg-black/40 border-y border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
                        From Idea to Viral <br className="hidden md:block" /> in Seconds
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our autonomous agent handles the entire production pipeline.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            <div
                                className={`w-24 h-24 rounded-2xl ${step.bg} border border-white/5 flex items-center justify-center mb-6 relative z-10 transition-transform group-hover:scale-110 duration-300 backdrop-blur-sm shadow-xl`}
                            >
                                <step.icon className={`w-10 h-10 ${step.color}`} />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                            <p className="text-gray-400 text-sm">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
