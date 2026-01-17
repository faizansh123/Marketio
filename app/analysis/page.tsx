"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Download, Share2, Play, CheckCircle2, TrendingUp, Sparkles, Instagram, Facebook, Video, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";

export default function AnalysisPage() {
    const [isPosting, setIsPosting] = useState(false);
    const [posted, setPosted] = useState(false);

    const handlePost = () => {
        setIsPosting(true);
        // Simulate API call
        setTimeout(() => {
            setIsPosting(false);
            setPosted(true);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-indigo-500/30">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/generate" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Analysis
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground mb-4">
                            Analysis Complete
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            We've analyzed 50+ viral hooks and generated high-converting creative assets for your campagin.
                        </p>
                    </motion.div>
                </div>

                {/* Section 1: Viral Intelligence */}
                <section className="mb-16">
                    <div className="flex items-center gap-2 mb-6 text-indigo-500">
                        <TrendingUp size={20} />
                        <h2 className="text-lg font-semibold uppercase tracking-wider">Viral Intelligence</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-card border border-border rounded-2xl p-4 hover:border-indigo-500/30 transition-colors group shadow-sm"
                            >
                                <div className="aspect-[9/16] bg-muted rounded-xl mb-4 relative overflow-hidden">
                                     {/* Mock Video Thumbnail */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 flex flex-col justify-end p-4">
                                        <div className="flex items-center gap-2 text-white mb-1">
                                            <Play size={16} className="fill-white" />
                                            <span className="font-bold">2.4M Views</span>
                                        </div>
                                        <p className="text-xs text-gray-300 line-clamp-2">Top performing hook: "Stop doing X if you want Y..."</p>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <Play size={48} className="fill-white text-white drop-shadow-lg" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>Viral Score</span>
                                        <span className="text-green-500">98/100</span>
                                    </div>
                                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-[98%]" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section 2: Generated Ads */}
                <section className="mb-16">
                    <div className="flex items-center gap-2 mb-6 text-purple-500">
                        <Sparkles size={20} />
                        <h2 className="text-lg font-semibold uppercase tracking-wider">Generated Creative Assets</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Video Ad */}
                        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-500/10 text-indigo-500 rounded-lg">
                                        <Video size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Video Ad Variant A</h3>
                                        <p className="text-xs text-muted-foreground">Optimized for TikTok & Reels</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">Ready to Post</span>
                            </div>
                            
                            <div className="aspect-video bg-muted rounded-2xl mb-6 relative group overflow-hidden border border-border flex items-center justify-center">
                                <div className="text-center">
                                    <Play size={48} className="mx-auto text-muted-foreground mb-2" />
                                    <p className="text-muted-foreground text-sm">Preview Generated Video</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background font-semibold py-3 px-4 rounded-xl hover:bg-foreground/90 transition-colors">
                                    <Download size={18} />
                                    Download Video
                                </button>
                            </div>
                        </div>

                        {/* Image Ad */}
                        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg">
                                        <ImageIcon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Static Ad Variant B</h3>
                                        <p className="text-xs text-muted-foreground">Optimized for Facebook Feed</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">Ready to Post</span>
                            </div>
                            
                            <div className="aspect-video bg-muted rounded-2xl mb-6 relative overflow-hidden border border-border flex items-center justify-center">
                                 <div className="text-center">
                                    <ImageIcon size={48} className="mx-auto text-muted-foreground mb-2" />
                                    <p className="text-muted-foreground text-sm">Preview Generated Image</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-secondary text-foreground font-semibold py-3 px-4 rounded-xl hover:bg-secondary/80 transition-colors border border-border">
                                    <Download size={18} />
                                    Download Image
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Action Hub - Post to Socials */}
                <section>
                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-50 blur-3xl bg-indigo-500/20 rounded-full w-64 h-64 -mr-32 -mt-32 pointer-events-none" />
                        
                        <div className="relative z-10 max-w-3xl">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Launch Campaign</h2>
                            <p className="text-muted-foreground mb-8">
                                Instantly publish these assets to your connected accounts. We'll handle the caption, hashtags, and scheduling based on peak viral times.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center gap-4 bg-background/50 p-4 rounded-xl border border-border flex-1 hover:border-indigo-500/50 transition-colors cursor-pointer shadow-sm">
                                    <div className="w-10 h-10 bg-[#E1306C] rounded-lg flex items-center justify-center text-white shrink-0">
                                        <Instagram size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-foreground">Instagram</div>
                                        <div className="text-xs text-muted-foreground">Connect account</div>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border border-border" />
                                </div>

                                <div className="flex items-center gap-4 bg-background/50 p-4 rounded-xl border border-border flex-1 hover:border-indigo-500/50 transition-colors cursor-pointer shadow-sm">
                                    <div className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center text-white shrink-0">
                                        <Facebook size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-foreground">Facebook</div>
                                        <div className="text-xs text-muted-foreground">Connect account</div>
                                    </div>
                                    <div className="w-5 h-5 rounded-full border border-border" />
                                </div>
                            </div>

                            <div className="mt-8">
                                <button 
                                    onClick={handlePost}
                                    disabled={posted}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPosting ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Publishing...
                                        </>
                                    ) : posted ? (
                                        <>
                                            <CheckCircle2 size={20} />
                                            Published Successfully
                                        </>
                                    ) : (
                                        <>
                                            <Share2 size={20} />
                                            Post to Selected Platforms
                                        </>
                                    )}
                                </button>
                                {posted && (
                                    <p className="mt-4 text-green-500 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                                        <CheckCircle2 size={14} />
                                        Your campaign is live! <span className="underline cursor-pointer">View Analytics</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
