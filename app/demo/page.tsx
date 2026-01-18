"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, TrendingUp, BarChart3, Play, Copy, Loader2, Sparkles, Video } from "lucide-react";
import { Navbar } from "@/components/Navbar";

// Dummy Data mimicking the N8N payload
const dummyData = {
    "product_context": {
        "name": "GlowUp Daily Serum",
        "category": "Skincare - Anti-aging & Brightening",
        "key_benefits": [
            "Reduces fine lines",
            "Evens skin tone",
            "Boosts radiance",
            "Deeply hydrates",
            "Non-greasy, fast-absorbing"
        ],
        "target_customer": "Women aged 25-45, concerned about early signs of aging, dullness, and seeking effective, easy-to-use skincare solutions."
    },
    "top_trends": [
        {
            "trend_name": "The Instant Glow-Up Transformation",
            "why_it_works_for_this_product": "This trend directly addresses a common pain point (dull, tired skin) and visually demonstrates the immediate, tangible solution (radiant, hydrated skin) provided by GlowUp Daily Serum. The 'before & after' format creates a high-impact, visually compelling narrative that drives desire and perceived efficacy, crucial for conversion.",
            "evidence_from_dataset": [
                "Videos showcasing users with tired/dull skin, applying a product, then revealing a noticeable improvement in radiance and texture within seconds/minutes. These videos consistently achieved high views and saves due to the 'wow' factor.",
                "Content featuring dramatic visual shifts from 'problem' (e.g., uneven skin tone, visible fine lines) to 'solution' (smooth, bright complexion) using fast cuts and trending audio, leading to strong engagement and 'where to buy' comments."
            ],
            "product_specific_hooks": [
                "My skin was dull, tired, and showing every late night... until THIS.",
                "Watch my skin go from 'meh' to 'WOW' in 30 seconds.",
                "Tired of dull skin? This is the only serum you need for an instant glow."
            ],
            "video_structure": {
                "0_3s": "Close-up of dull, tired skin (or user looking visibly fatigued/frustrated). Text overlay: 'My biggest skin problem...' or 'Is your skin looking tired?'",
                "3_10s": "Quick cut to user applying GlowUp Daily Serum. Show satisfying texture, gentle massage into skin. Voiceover: 'I tried everything, but nothing gave me this glow until GlowUp Daily Serum.'",
                "10_20s": "Dramatic transition to user with visibly brighter, hydrated, and smoother skin (after absorption). Show close-ups of radiant complexion, emphasizing reduced fine lines. Voiceover: 'Look at this glow! Fine lines are softer, my skin feels amazing and looks years younger.'",
                "20_30s": "User confidently smiling, holding the GlowUp Daily Serum. Clear call to action: 'Get your glow-up now! Link in bio to shop the secret to radiant skin.'"
            },
            "editing_notes": [
                "Use fast, impactful cuts between 'before' and 'after' shots. Ensure bright, natural lighting for 'after' segments to highlight radiance.",
                "Incorporate a trending, upbeat audio track. Utilize clear, concise text overlays to highlight key benefits like 'Instant Radiance' and 'Reduces Fine Lines'."
            ],
            "caption_templates": [
                "Confession: My skin used to look as tired as I felt. 😩 But then GlowUp Daily Serum entered the chat and changed EVERYTHING. Seriously, the glow is real! ✨ #GlowUp #SkincareRoutine #BeforeAndAfter #RadiantSkin #DailySerum",
                "From dull to dazzling in one step! If you're struggling with tired-looking skin, you NEED to try GlowUp Daily Serum. My secret weapon for a youthful glow! 🤫💖 #AntiAging #SkincareGoals #MustHave #GlowUpDaily"
            ],
            "hashtag_strategy": {
                "broad": [
                    "#Skincare",
                    "#Beauty",
                    "#BeautyHacks"
                ],
                "niche": [
                    "#AntiAgingSerum",
                    "#BrighteningSerum",
                    "#GlowUpChallenge"
                ],
                "intent": [
                    "#ShopNow",
                    "#LinkInBio",
                    "#SkincareRoutine"
                ]
            }
        },
        {
            "trend_name": "Authentic Routine Integration / 'Get Ready With Me' (GRWM)",
            "why_it_works_for_this_product": "This trend builds trust and relatability by showcasing GlowUp Daily Serum seamlessly integrated into a real-life morning or evening routine. It feels less like an overt ad and more like a genuine recommendation from a peer, emphasizing ease of use and consistent results, which is key for long-term product adoption and conversion.",
            "evidence_from_dataset": [
                "Videos where users naturally incorporate skincare products into their daily routines (e.g., GRWM, evening routine), talking through each step and highlighting product benefits. These videos consistently achieved high watch times and positive, engaging comments.",
                "Content that demonstrates product application within a broader lifestyle context, making the product feel essential and easy to use, leading to higher 'add to cart' rates due to perceived authenticity."
            ],
            "product_specific_hooks": [
                "Come get ready with me and see my secret to glowing skin!",
                "My 3-step morning routine for skin that actually glows all day.",
                "This is how I keep my skin looking fresh and hydrated, even on 5 hours of sleep."
            ],
            "video_structure": {
                "0_3s": "User starting their routine (e.g., washing face, sitting at vanity). Hook text overlay: 'My everyday glow secret!'",
                "3_10s": "User applies toner, then picks up GlowUp Daily Serum. 'Next, my absolute favorite: GlowUp Daily Serum. A few drops are all I need for incredible hydration and brightness.' Show satisfying application.",
                "10_20s": "User continues with other routine steps (moisturizer, SPF) while subtly highlighting how the serum preps skin. 'It absorbs so fast, leaves no sticky residue, and makes my moisturizer work even better. My skin feels plump and smooth.' Show radiant skin up close.",
                "20_30s": "User finishes routine, looks confident and radiant. 'And that's it! Ready to take on the day with my GlowUp. You can find this game-changer in my bio!'"
            },
            "editing_notes": [
                "Use natural lighting and smooth transitions between routine steps. Incorporate soft, calming background music.",
                "Maintain an authentic, conversational voiceover. Ensure subtle product placement that feels organic rather than forced."
            ],
            "caption_templates": [
                "GRWM for a productive day! ✨ My secret weapon for that 'lit-from-within' glow? The GlowUp Daily Serum. It's a game-changer for fine lines and dullness! #GRWM #SkincareRoutine #MorningRoutine #GlowUpDaily #HealthySkin",
                "My skin has never felt better since I added GlowUp Daily Serum to my daily routine. Hydrated, bright, and ready for anything! What's your go-to? 👇 #DailySkincare #BeautyRoutine #Serum #SkincareSecrets"
            ],
            "hashtag_strategy": {
                "broad": [
                    "#GRWM",
                    "#SkincareRoutine",
                    "#BeautyTips"
                ],
                "niche": [
                    "#MorningSkincare",
                    "#EveningRoutine",
                    "#SkincareSecrets"
                ],
                "intent": [
                    "#GetTheLook",
                    "#MustHaveProduct",
                    "#LinkInBio"
                ]
            }
        },
        {
            "trend_name": "Quick Skincare Hacks / Educational Bites",
            "why_it_works_for_this_product": "This trend positions GlowUp Daily Serum as an intelligent, effective solution within a broader context of skincare knowledge. It appeals to users looking for quick, actionable advice and smart product choices, building authority and trust. By presenting the serum as a 'hack' or essential step, it elevates its perceived value and necessity for achieving desired skin goals.",
            "evidence_from_dataset": [
                "Short, punchy videos offering a 'hack' or 'tip' related to skincare, often featuring a specific product as the solution to a common problem. These videos achieved high shareability and saves due to their informative and actionable nature.",
                "Content that debunks skincare myths or simplifies complex routines, introducing a product as the 'smart switch' or 'missing step'. These videos generated strong interest and 'learn more' clicks."
            ],
            "product_specific_hooks": [
                "STOP making this skincare mistake! (And what to do instead)",
                "The one ingredient your anti-aging routine is missing.",
                "Want brighter, smoother skin? It's simpler than you think."
            ],
            "video_structure": {
                "0_3s": "User presents a common skincare problem or myth (e.g., 'Are you skipping serum?'). Quick, direct question with text overlay.",
                "3_10s": "User explains *why* it's a problem or debunks the myth. 'Many think moisturizer is enough, but serum targets specific concerns deeper, like fine lines and dullness!'",
                "10_20s": "Introduce GlowUp Daily Serum as the solution. Show key ingredients or benefits visually (e.g., 'Packed with Vitamin C & Hyaluronic Acid!'). 'That's why GlowUp Daily Serum is a non-negotiable for me – it tackles fine lines AND boosts radiance like nothing else.'",
                "20_30s": "Quick demo of application, emphasizing ease and visible results. Call to action. 'Make the smart switch for visibly radiant, younger-looking skin. Tap the link to transform your routine!'"
            },
            "editing_notes": [
                "Maintain a fast-paced rhythm with clear, bold text overlays for key points and statistics. Use an energetic, authoritative voiceover.",
                "Incorporate quick graphics or bullet points to convey information efficiently. Consider before/after flashes if applicable to reinforce the 'solution'."
            ],
            "caption_templates": [
                "Skincare hack alert! 🚨 If you're not using a daily serum, you're missing out on major glow-up potential. GlowUp Daily Serum is my secret for tackling fine lines and boosting radiance! #SkincareHack #BeautyTips #AntiAging #GlowUp #SerumBenefits",
                "Myth busted: You don't need 10 steps for amazing skin! Just one powerful serum like GlowUp Daily Serum can transform your complexion. ✨ Ready for brighter, smoother skin? #SkincareEducation #BeautySecrets #DailySerum #HealthySkin #SmartSkincare"
            ],
            "hashtag_strategy": {
                "broad": [
                    "#SkincareTips",
                    "#BeautyHacks",
                    "#LearnOnTikTok"
                ],
                "niche": [
                    "#SerumBenefits",
                    "#AntiAgingTips",
                    "#VitaminCSkincare"
                ],
                "intent": [
                    "#ShopSkincare",
                    "#BeautyDeals",
                    "#TryItNow"
                ]
            }
        }
    ],
    "creator_recipe_json": {
        "hook": "My skin was dull, tired, and showing every late night... until THIS.",
        "video_style": "Fast-paced visual transformation from tired, dull skin to radiant, glowing skin, with satisfying product application shots and clear benefit overlays. Utilize bright, natural lighting for 'after' shots and an upbeat, trending audio track.",
        "caption": "Confession: My skin used to look as tired as I felt. 😩 But then GlowUp Daily Serum entered the chat and changed EVERYTHING. Seriously, the glow is real! ✨ Tap the link to get your own glow-up! #GlowUp #SkincareRoutine #BeforeAndAfter #RadiantSkin #DailySerum #AntiAging #ShopNow",
        "hashtags": [
            "#GlowUp",
            "#SkincareRoutine",
            "#BeforeAndAfter",
            "#RadiantSkin",
            "#DailySerum",
            "#AntiAging",
            "#ShopNow"
        ]
    },
    "veo3_prompt": "Generate a 8-second TikTok-style video for 'GlowUp Daily Serum'. The video should start with a close-up of a young woman (25-35) looking tired with slightly dull skin, expressing frustration. Quickly transition to her applying the 'GlowUp Daily Serum' with satisfying, close-up shots of the serum texture and gentle massage. The mid-section should show a dramatic visual transformation to her skin looking visibly radiant, hydrated, and smooth, with a 'lit-from-within' glow. Include text overlays like 'Dull Skin? NO MORE!' and 'Instant Radiance Boost'. End with the woman confidently smiling, holding the product, and a clear call to action: 'Get Your GlowUp! Link in Bio'. Use an upbeat, trending audio track. Focus on bright, natural lighting for the 'after' shots."
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
