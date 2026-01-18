"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, BarChart3, Play, Copy, Loader2, Sparkles, Video } from "lucide-react";
import { Navbar } from "@/components/Navbar";

// Dummy Data mimicking the N8N payload
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
            "why_it_works_for_this_product": "This trend directly addresses common frustrations users experience with inferior headsets (lag, bad mic, discomfort, tangled wires), positioning our product as the ultimate solution. Its high relatability drives engagement and conversion intent by solving a clear pain point.",
            "evidence_from_dataset": [
                "Videos starting with 'When your teammates can't hear you...' or 'POV: Your old headphones die mid-game' consistently show high share rates and user comments expressing similar issues.",
                "Content showcasing 'before & after' audio quality or comfort upgrades generates strong 'add to cart' clicks and positive sentiment regarding problem resolution."
            ],
            "product_specific_hooks": [
                "POV: You're trying to clutch a game with laggy audio and a crackly mic.",
                "When your wireless headset keeps disconnecting during important work calls...",
                "Tired of uncomfortable headphones that pinch your ears after an hour of gaming?"
            ],
            "video_structure": {
                "0_3s": "Hook: Visually depict a common headset problem (e.g., frustrated gamer, tangled wires, static sound effect).",
                "3_10s": "Amplify the pain point with quick cuts of common headset issues. Introduce the product as the immediate solution.",
                "10_20s": "Showcase product features solving the problem (e.g., seamless wireless connection, crystal-clear mic demo, comfortable fit close-up).",
                "20_30s": "User enjoying the product, benefits highlighted with text overlays, clear call to action."
            },
            "editing_notes": [
                "Use dramatic, jarring sound effects for the 'problem' phase and smooth, high-fidelity audio for the 'solution' phase to create contrast.",
                "Incorporate text overlays for key pain points and product benefits to reinforce the message and ensure clarity even without sound."
            ],
            "caption_templates": [
                "Level up your audio game! 🎧 Say goodbye to lag and discomfort with our new high-performance headsets. #GameChanger #AudioUpgrade",
                "Is your headset holding you back? 🤔 Experience crystal-clear sound and ultimate comfort. Tap to shop! #TechSolutions #MustHave"
            ],
            "hashtag_strategy": {
                "broad": [
                    "#GamingHeadset",
                    "#WirelessHeadphones"
                ],
                "niche": [
                    "#LowLatency",
                    "#GamerLife"
                ],
                "intent": [
                    "#BuyNow",
                    "#ShopHeadsets"
                ]
            }
        },
        {
            "trend_name": "Unleash Your Inner Pro: Performance Demos",
            "why_it_works_for_this_product": "This trend directly demonstrates the product's superior capabilities in its core use cases (gaming, professional audio), appealing to users who prioritize performance and competitive advantage. Visual and auditory proof builds trust and showcases tangible value.",
            "evidence_from_dataset": [
                "Videos featuring side-by-side comparisons of audio clarity or latency tests consistently achieve high completion rates and generate 'wow' comments.",
                "Content showing intense gameplay or professional use cases with the product drives significant engagement and product page views from aspirational users."
            ],
            "product_specific_hooks": [
                "Hear every single footstep: The ultimate gaming advantage is here.",
                "Is your mic this clear? Take our sound test challenge!",
                "Experience audio like never before: Wired vs. Wireless performance, no compromise."
            ],
            "video_structure": {
                "0_3s": "Hook: Intense gaming moment, crisp audio snippet, or a direct performance challenge.",
                "3_10s": "Quick cuts showcasing key performance features (e.g., ultra-low latency in action, noise cancellation demo, audio spectrum visualization).",
                "10_20s": "In-depth demo of a specific feature (e.g., mic quality test with voiceover, immersive sound experience with game footage, seamless switching between devices).",
                "20_30s": "Highlight benefits for specific users (gamers, remote workers), strong call to action with product shot."
            },
            "editing_notes": [
                "Utilize split-screen effects or 'before & after' comparisons to contrast generic audio/mic quality with the product's superior performance.",
                "Incorporate dynamic text overlays to highlight technical specs like '20ms Latency' or 'Crystal Clear Mic' for quick information absorption."
            ],
            "caption_templates": [
                "Dominate every game with unparalleled audio precision. 🏆 Get the edge you need. Link in bio! #GamingGear #ProAudio",
                "From competitive gaming to crystal-clear calls, our headsets deliver. Hear the difference. #TechPerformance #MustHaveTech"
            ],
            "hashtag_strategy": {
                "broad": [
                    "#GamingSetup",
                    "#HeadsetReview"
                ],
                "niche": [
                    "#EsportsReady",
                    "#Audiophile"
                ],
                "intent": [
                    "#BestGamingHeadset",
                    "#ShopNow"
                ]
            }
        },
        {
            "trend_name": "Satisfying Unboxing & Aesthetic Setup",
            "why_it_works_for_this_product": "This trend taps into the desire for premium experiences and visual satisfaction. ASMR elements create an immersive and calming experience, while aesthetic setups inspire users to envision the product in their own space, building desire through sensory appeal and aspirational content.",
            "evidence_from_dataset": [
                "ASMR unboxing videos of tech products consistently generate high watch times and positive sentiment in comments, often leading to 'where can I buy this' inquiries.",
                "Videos showcasing clean, aesthetic desk setups featuring the product drive aspirational engagement and significant saves, indicating strong purchase intent."
            ],
            "product_specific_hooks": [
                "Unbox pure audio bliss. ✨ The most satisfying reveal.",
                "The most satisfying headset setup you'll see today, guaranteed.",
                "POV: You just upgraded your entire setup with the ultimate audio gear."
            ],
            "video_structure": {
                "0_3s": "Hook: Close-up of the product box, satisfying plastic peel, or a visually appealing shot of the headset.",
                "3_10s": "ASMR unboxing sequence (peeling plastic, opening box, gentle clicks, product reveal).",
                "10_20s": "Aesthetic setup montage (placing headset on stand, connecting cables neatly, close-ups of design details, RGB lighting if applicable).",
                "20_30s": "Final aesthetic shot of the complete setup, user interacting with the product, subtle call to action."
            },
            "editing_notes": [
                "Prioritize clean, well-lit shots with a focus on product textures and design details. Use slow-motion for satisfying moments like peeling plastic or placing the headset.",
                "Integrate subtle ASMR sounds (unboxing, button clicks, cable management) throughout the video, ensuring background music is minimal or absent to highlight these sounds."
            ],
            "caption_templates": [
                "Upgrade your setup, elevate your sound. ✨ Every detail designed for perfection. #DeskSetup #TechAesthetics",
                "Pure audio, pure style. Unbox the future of sound. Link in bio! #Unboxing #GamingRoom"
            ],
            "hashtag_strategy": {
                "broad": [
                    "#TechUnboxing",
                    "#ASMR"
                ],
                "niche": [
                    "#DeskGoals",
                    "#GamingSetupIdeas"
                ],
                "intent": [
                    "#NewHeadset",
                    "#ShopNow"
                ]
            }
        }
    ],
    "creator_recipe_json": {
        "hook": "Stop scrolling! Your audio game is about to change forever. 🎧",
        "video_style": "Fast-paced, engaging cuts with clear product demonstrations, overlaid with trending audio and dynamic text.",
        "caption": "Experience the difference with our high-performance headsets. Wired or wireless, superior sound is guaranteed. Tap the link to upgrade! #AudioUpgrade #TechEssentials #MustHave",
        "hashtags": [
            "#GamingHeadset",
            "#WirelessAudio",
            "#TechReview"
        ]
    },
    "veo3_prompt": "Generate a dynamic TikTok ad for high-performance wired/wireless headsets. The video should feature quick cuts, showcasing both the sleek design and powerful audio capabilities. Include a 'problem/solution' narrative (e.g., bad old headphones vs. new product) and a 'performance demo' (e.g., gaming sound clarity, clear mic test). Incorporate text overlays highlighting key benefits like 'ultra-low latency' and 'crystal-clear mic'. Use trending, upbeat background music and a clear call to action at the end."
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

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to generate video");
            }

            const data = await res.json();
<<<<<<< HEAD
            setVideoUrl(data.videoUrl); 

            // --- AUTO-EXPORT TO SHEETS ---
            // We fire and forget this request so it doesn't block the UI
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
            
=======
            setVideoUrl(data.videoUrl);
>>>>>>> 9815f8fce447598374a231355cae86c4c0008e3d
        } catch (error: any) {
            console.error(error);
            alert(`Video generation failed: ${error.message}`);
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
                                        <div className="aspect-[9/16] w-full max-w-[320px] mx-auto rounded-xl overflow-hidden border border-white/20 bg-black relative shadow-2xl">
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
