"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Sparkles, Video } from "lucide-react";

export function Hero() {
    const router = useRouter();
    const { theme } = useTheme();

    return (
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-start pt-20 md:pt-32 overflow-hidden bg-[#f8f9fa]">
            
            {/* Grid Background Pattern (Subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-[0.3]" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
                
                {/* Main Headline */}
                <h1 className="flex flex-col gap-2 font-[family-name:var(--font-poppins)] text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-[#0f172a] leading-[1.1]">
                    <span>Stop struggling with content.</span>
                    <span>Start dominating your niche.</span>
                </h1>

                {/* Subheadline */}
                <p className="mt-8 text-sm md:text-base font-medium text-muted-foreground max-w-lg mx-auto">
                    Your all-in-one AI agent that discovers trends, writes scripts, and creates viral short-form videos — in minutes.
                </p>

                {/* CTA Button */}
                <div className="mt-8 mb-20">
                    <Button 
                        size="lg" 
                        className="rounded-md px-10 py-7 text-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 gap-2"
                        onClick={() => router.push('/generate')}
                    >
                        <Sparkles className="h-5 w-5" />
                        Start Generating
                    </Button>
                </div>

            </div>

            {/* Rising Graph Visualization (SVG) */}
            <div className="absolute bottom-0 left-0 right-0 w-full h-[40vh] md:h-[50vh] z-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
                     {/* Dashed Vertical Lines (Weeks) */}
                    <line x1="200" y1="0" x2="200" y2="400" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="200" y="390" fill="#94a3b8" fontSize="10" textAnchor="middle">Week 2</text>
                    
                    <line x1="500" y1="0" x2="500" y2="400" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="500" y="380" fill="#94a3b8" fontSize="10" textAnchor="middle">Week 4</text>

                    <line x1="800" y1="0" x2="800" y2="400" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="800" y="380" fill="#94a3b8" fontSize="10" textAnchor="middle">Week 6</text>

                    <line x1="1100" y1="0" x2="1100" y2="400" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="1100" y="380" fill="#94a3b8" fontSize="10" textAnchor="middle">Week 8</text>

                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
                        </linearGradient>

                    </defs>



                    {/* The Graph Curve (Bezier) */}
                    <path 
                        d="M0,380 C360,370 540,360 720,290 C950,180 1150,100 1440,30 L1440,400 L0,400 Z" 
                        fill="url(#graphGradient)" 
                    />
                    <path 
                        d="M0,380 C360,370 540,360 720,290 C950,180 1150,100 1440,30" 
                        fill="none" 
                        stroke="#4f46e5" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                    />

                    {/* Blue Dot (Scaling Phase) - Week 8 */}
                    <circle cx="950" cy="188" r="7" fill="#3b82f6" stroke="white" strokeWidth="4" />

                </svg>
            </div>
            
            {/* "The Old Way" Floating Widget */}
            <div className="absolute bottom-[18%] left-4 md:left-[6%] z-20 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                <p className="text-sm font-medium text-muted-foreground max-w-[220px] leading-tight">
                    The old way to spot trends, write scripts, and edit videos:
                </p>
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-black/5 p-2 rounded-full shadow-lg w-fit">
                    
                    {/* TikTok (Research) */}
                    <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full shadow-sm overflow-hidden p-1.5">
                         <img src="https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg" alt="TikTok" className="w-full h-full object-contain invert" />
                    </div>

                    {/* Google Sheets (Planning) */}
                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg" alt="Sheets" className="w-4 h-5" />
                    </div>

                     {/* ChatGPT (Scripting) */}
                     <div className="w-8 h-8 flex items-center justify-center bg-[#74aa9c] rounded-full shadow-sm border border-emerald-100">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="ChatGPT" className="w-5 h-5" />
                    </div>

                    {/* Notion (Organization) */}
                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-5 h-5" />
                    </div>

                    {/* CapCut (Editing) */}
                    <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm p-1.5 overflow-hidden">
                         <img src="/assets/capcut-logo.jpg" alt="CapCut" className="w-full h-full object-contain scale-110" />
                    </div>

                    {/* Reddit (Research) */}
                     <div className="w-8 h-8 flex items-center justify-center bg-[#FF4500] rounded-full shadow-sm p-1.5">
                        <img src="/assets/reddit.svg" alt="Reddit" className="w-full h-full object-contain" />
                    </div>

                    {/* +12 Badge */}
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full shadow-sm border border-gray-200">
                        <span className="text-xs font-bold text-gray-500">+12</span>
                    </div>

                </div>
            </div>

        </section>
    );
}
