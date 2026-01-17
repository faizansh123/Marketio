"use client";

import { useState, useRef, useEffect } from "react";
import { GeneratorInput } from "./GeneratorInput";
import { motion } from "framer-motion";
import { Sparkles, Bot, User, TrendingUp, BarChart3, AlertCircle, CheckCircle2, FileIcon, ArrowRight } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Message {
    role: "user" | "assistant";
    content: string;
    type?: "text" | "analysis";
    data?: any; // For structured analysis data
    files?: File[]; // To display uploaded files
}

interface ChatInterfaceProps {
    initialInput: string;
    initialFiles: File[];
}

export function ChatInterface({ initialInput, initialFiles }: ChatInterfaceProps) {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
<<<<<<< HEAD
    const hasInitialized = useRef(false);
=======
    const router = useRouter();
>>>>>>> d6e18fac694b2294c879d2fd8a8937f9a86a130e

    // Initial load effect
    useEffect(() => {
        if (!hasInitialized.current && (initialInput || initialFiles.length > 0)) {
            hasInitialized.current = true;
            
            // Add user's initial message
            const userMsg: Message = {
                role: "user",
                content: initialInput,
                files: initialFiles
            };
            setMessages([userMsg]);

            // Trigger AI response (mock)
            generateResponse(userMsg, initialFiles);
        }
    }, [initialInput, initialFiles]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const hasAnalysis = messages.some(m => m.type === "analysis");

    // Helper to convert file to base64
    const fileToGenerativePart = async (file: File): Promise<{ mimeType: string; data: string }> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                // Remove the data URL prefix (e.g. "data:image/jpeg;base64,")
                const base64Data = base64String.split(',')[1];
                resolve({
                    mimeType: file.type,
                    data: base64Data
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    const generateResponse = async (userMsg: Message, files: File[] = []) => {
        setIsTyping(true);

        // Determine type of request
        const hasAnalysis = messages.some(m => m.type === "analysis");
        const type = hasAnalysis ? "chat" : "analysis";

        // Prepare history for API (map to {role, content})
        const history = messages.map(m => ({ role: m.role, content: m.content }));

        // Process files if any
        let processedFiles: { mimeType: string; data: string }[] = [];
        if (files.length > 0) {
            try {
                processedFiles = await Promise.all(files.map(fileToGenerativePart));
            } catch (error) {
                console.error("Error processing files:", error);
            }
        }

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userMsg.content,
                    history: history,
                    type: type,
                    files: processedFiles // Send processed files
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.details || "Failed to fetch response");
            }

            const data = await res.json();

            // The API returns the full message object
            const assistantMsg: Message = data;

            setMessages(prev => [...prev, assistantMsg]);

        } catch (error) {
            console.error("Chat error:", error);

            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            let friendlyMessage = "Sorry, I encountered an error connecting to the AI. Please try again.";

            if (errorMessage.includes("Quota") || errorMessage.includes("429")) {
                friendlyMessage = "Usage limit exceeded. Please wait a moment before trying again.";
            }

            // Fallback error message
            setMessages(prev => [...prev, {
                role: "assistant",
                content: friendlyMessage,
                type: "text"
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleNewMessage = (input: string, files: File[]) => {
        const newMsg: Message = { role: "user", content: input, files: files };
        setMessages(prev => [...prev, newMsg]);
        generateResponse(newMsg, files);
    };

    const handleStartAnalysis = () => {
        const analysisMsg = messages.find(m => m.type === "analysis");
        if (analysisMsg && analysisMsg.data && analysisMsg.data.niche) {
            const product = analysisMsg.data.product || "";
            router.push(`/analysis-loading?niche=${encodeURIComponent(analysisMsg.data.niche)}&product=${encodeURIComponent(product)}`);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] w-full max-w-5xl mx-auto relative">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "flex gap-4 max-w-4xl",
                            msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                        )}
                    >
                        {/* Avatar */}
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                            msg.role === "assistant" ? "bg-indigo-500/10 text-indigo-500" : "bg-muted text-muted-foreground"
                        )}>
                            {msg.role === "assistant" ? <Sparkles size={16} /> : <User size={16} />}
                        </div>

                        {/* Content */}
                        <div className={cn(
                            "rounded-2xl p-4 text-sm leading-relaxed",
                            msg.role === "user" ? "bg-indigo-600 text-white" : "bg-card border border-border text-foreground w-full shadow-sm"
                        )}>
                            {/* File Attachments */}
                            {msg.files && msg.files.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {msg.files.map((file, i) => (
                                        <div key={i} className="relative group">
                                            {file.type.startsWith('image/') ? (
<<<<<<< HEAD
                                                <div className="w-20 h-20 rounded-lg overflow-hidden border border-border">
                                                    <img 
                                                        src={URL.createObjectURL(file)} 
=======
                                                <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/20">
                                                    <img
                                                        src={URL.createObjectURL(file)}
>>>>>>> d6e18fac694b2294c879d2fd8a8937f9a86a130e
                                                        alt={file.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg border border-border text-muted-foreground">
                                                    <FileIcon size={14} />
                                                    <span className="text-xs max-w-[100px] truncate">{file.name}</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {/* Markdown Content */}
<<<<<<< HEAD
                            <div className={cn("text-sm leading-relaxed", msg.role === "user" ? "text-white" : "text-foreground")}>
                                <ReactMarkdown 
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                                        strong: ({node, ...props}) => <strong className={cn("font-bold", msg.role === "user" ? "text-white" : "text-foreground")} {...props} />,
                                        h1: ({node, ...props}) => <h1 className={cn("text-3xl font-bold mb-3 mt-4", msg.role === "user" ? "text-white" : "text-foreground")} {...props} />,
                                        h2: ({node, ...props}) => <h2 className={cn("text-lg font-bold mb-2 mt-3", msg.role === "user" ? "text-white" : "text-foreground")} {...props} />,
                                        h3: ({node, ...props}) => <h3 className={cn("text-md font-bold mb-1 mt-2", msg.role === "user" ? "text-white" : "text-foreground")} {...props} />,
                                        blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-indigo-500 pl-4 py-1 my-2 bg-muted/50 rounded-r" {...props} />,
                                        code: ({node, ...props}) => {
=======
                            <div className="text-sm leading-relaxed text-gray-200">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                                        h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-2 mt-4 text-white" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-3 text-white" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-md font-bold mb-1 mt-2 text-white" {...props} />,
                                        blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-indigo-500 pl-4 py-1 my-2 bg-white/5 rounded-r" {...props} />,
                                        code: ({ node, ...props }) => {
>>>>>>> d6e18fac694b2294c879d2fd8a8937f9a86a130e
                                            const { className, children } = props;
                                            const match = /language-(\w+)/.exec(className || '');
                                            const isInline = !match && !String(children).includes('\n');
                                            return isInline ? (
                                                <code className="bg-black/10 dark:bg-black/30 px-1.5 py-0.5 rounded text-indigo-600 dark:text-indigo-300 font-mono text-xs" {...props} />
                                            ) : (
                                                <code className="block bg-black/10 dark:bg-black/30 p-2 rounded-lg overflow-x-auto mb-2 text-xs font-mono" {...props} />
                                            );
                                        },
<<<<<<< HEAD
                                        pre: ({node, ...props}) => <pre className="bg-transparent p-0 m-0" {...props} />,
                                        a: ({node, ...props}) => <a className="text-indigo-500 hover:text-indigo-400 underline" target="_blank" rel="noopener noreferrer" {...props} />,
=======
                                        pre: ({ node, ...props }) => <pre className="bg-transparent p-0 m-0" {...props} />,
                                        a: ({ node, ...props }) => <a className="text-indigo-400 hover:text-indigo-300 underline" target="_blank" rel="noopener noreferrer" {...props} />,
>>>>>>> d6e18fac694b2294c879d2fd8a8937f9a86a130e
                                    }}
                                >
                                    {msg.content}
                                </ReactMarkdown>
                            </div>

                            {/* Render Analysis Widget if type is analysis */}
                            {msg.type === "analysis" && msg.data && (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="bg-muted/50 p-3 rounded-xl border border-border">
                                        <div className="flex items-center gap-2 text-indigo-500 mb-1">
                                            <TrendingUp size={16} />
                                            <span className="font-semibold text-xs uppercase tracking-wider">Trend Score</span>
                                        </div>
                                        <div className="text-2xl font-bold text-foreground">{msg.data.trendScore}/100</div>
                                        <div className="w-full bg-secondary h-1 mt-2 rounded-full overflow-hidden">
                                            <div className="bg-indigo-500 h-full" style={{ width: `${msg.data.trendScore}%` }} />
                                        </div>
                                    </div>

                                    <div className="bg-muted/50 p-3 rounded-xl border border-border">
                                        <div className="flex items-center gap-2 text-purple-500 mb-1">
                                            <BarChart3 size={16} />
                                            <span className="font-semibold text-xs uppercase tracking-wider">Competition</span>
                                        </div>
                                        <div className="text-2xl font-bold text-foreground">{msg.data.competitorSaturation}</div>
                                        <div className="text-xs text-muted-foreground mt-1">Market is active but penetrable.</div>
                                    </div>

<<<<<<< HEAD
                                    <div className="col-span-1 md:col-span-2 bg-muted/50 p-3 rounded-xl border border-border">
                                         <div className="flex items-center gap-2 text-green-500 mb-2">
=======
                                    <div className="col-span-1 md:col-span-2 bg-black/20 p-3 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-2 text-green-400 mb-2">
>>>>>>> d6e18fac694b2294c879d2fd8a8937f9a86a130e
                                            <CheckCircle2 size={16} />
                                            <span className="font-semibold text-xs uppercase tracking-wider">Key Hooks</span>
                                        </div>
                                        <ul className="space-y-2">
                                            {msg.data.opportunities.map((opp: string, i: number) => (
                                                <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                                                    {opp}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-4 mr-auto max-w-4xl"
                    >
<<<<<<< HEAD
                         <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
=======
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
>>>>>>> d6e18fac694b2294c879d2fd8a8937f9a86a130e
                            <Sparkles size={16} />
                        </div>
                        <div className="bg-card border border-border rounded-2xl p-4 flex gap-1 items-center shadow-sm">
                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area */}
<<<<<<< HEAD
            <div className="p-4 bg-background border-t border-border relative z-20">
               <GeneratorInput onGenerate={handleNewMessage} placeholder="Ask follow-up questions..." />
=======
            <div className="p-4 bg-[#0a0a0f] border-t border-white/10 relative z-20">
                <GeneratorInput onGenerate={handleNewMessage} placeholder="Ask follow-up questions..." />
>>>>>>> d6e18fac694b2294c879d2fd8a8937f9a86a130e
            </div>

            {/* Floating Action Button */}
            {hasAnalysis && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute bottom-24 right-4 z-30"
                >
<<<<<<< HEAD
                    <button 
                        onClick={() => router.push('/analysis')}
=======
                    <button
                        onClick={handleStartAnalysis}
>>>>>>> d6e18fac694b2294c879d2fd8a8937f9a86a130e
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 px-5 rounded-full shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 border border-white/10 backdrop-blur-md"
                    >
                        Start Analyzing
                        <ArrowRight size={16} />
                    </button>
                </motion.div>
            )}
        </div>
    );
}
