"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight, Play, TrendingUp, Video, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-indigo-300 backdrop-blur-sm"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        Now supporting TikTok, Reels, & Shorts
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
                    >
                        Turn Trends into <br />
                        <span className="text-indigo-400">Viral Revenue</span> Automatically
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        An AI agent that monitors social trends, strategizes content for your niche, and generates high-performing short-form videos. No editing required.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <Link href="/generate">
                            <Button variant="glow" size="lg" className="h-14 px-8 text-lg">
                                <Sparkles className="mr-2 h-5 w-5" />
                                Start Generating
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 hover:text-white">
                            <Play className="mr-2 h-5 w-5 fill-current" />
                            Watch Demo
                        </Button>
                    </motion.div>

                    {/* Floating Cards (Mock UI) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="relative mt-16 w-full max-w-5xl mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20 pointer-events-none" />

                        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                            {/* Card 1: Trend Analysis */}
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400"><TrendingUp size={20} /></div>
                                    <div className="text-sm font-medium text-gray-300">Trend Detected</div>
                                </div>
                                <div className="text-xs text-gray-500">"UGC Selfie Style" is trending in Skincare. (+420% Lift)</div>
                                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-pink-500 w-[85%]"></div>
                                </div>
                            </div>

                            {/* Card 2: Strategy */}
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3 md:-mt-8 md:mb-8 border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400"><Sparkles size={20} /></div>
                                    <div className="text-sm font-medium text-gray-300">Generating Strategy</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs text-gray-400">
                                        <span>Hook</span>
                                        <span className="text-green-400">98/100</span>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded text-xs text-gray-300">
                                        "Stop scrolling if you have [Pain Point]..."
                                    </div>
                                </div>
                            </div>

                            {/* Card 3: Video Output */}
                            <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-3">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Video size={20} /></div>
                                    <div className="text-sm font-medium text-gray-300">Video Ready</div>
                                </div>
                                <div className="aspect-[9/16] bg-gradient-to-br from-gray-800 to-black rounded-lg relative overflow-hidden flex items-center justify-center group cursor-pointer">
                                    <Play className="text-white opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                        <div className="w-16 h-2 bg-gray-600/50 rounded-full mx-auto"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
