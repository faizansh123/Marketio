"use client";

import { useState } from "react";
import { GeneratorInput } from "@/components/GeneratorInput";
import { Navbar } from "@/components/Navbar";
import { ChatInterface } from "@/components/ChatInterface";
import { motion, AnimatePresence } from "framer-motion";

export default function GeneratePage() {
    const [hasStarted, setHasStarted] = useState(false);
    const [initialInput, setInitialInput] = useState("");
    const [initialFiles, setInitialFiles] = useState<File[]>([]);

    const handleInitialGenerate = (input: string, files: File[]) => {
        setInitialInput(input);
        setInitialFiles(files);
        setHasStarted(true);
    };

    return (
        <main className="min-h-screen bg-background text-foreground overflow-hidden relative font-sans">
            <Navbar />
            
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 dark:bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            
            <div className="container mx-auto px-4 pt-20 h-[calc(100vh)] flex flex-col">
                <AnimatePresence mode="wait">
                    {!hasStarted ? (
                        <motion.div 
                            key="initial"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                            className="flex-1 flex flex-col items-center justify-center -mt-20"
                        >
                            <div className="w-full max-w-2xl space-y-8 mb-20 text-center">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/50 pb-2">
                                    Tell Me About Your Product
                                </h1>
                                <p className="text-xl text-muted-foreground">
                                    Describe your product or upload a document to get started.
                                </p>
                                
                                <div className="mt-8">
                                    <GeneratorInput onGenerate={handleInitialGenerate} />
                                </div>
                            </div>
                            
                            {/* Suggestions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl opacity-50 hover:opacity-100 transition-opacity duration-500">
                                {["Generate ads for a coffee shop", "Analyze my SaaS landing page", "Create easy TikTok ideas"].map((suggestion) => (
                                    <button 
                                        key={suggestion} 
                                        onClick={() => handleInitialGenerate(suggestion, [])}
                                        className="p-4 rounded-xl border border-border bg-card hover:bg-muted transition-all cursor-pointer text-sm text-muted-foreground text-center shadow-sm"
                                    >
                                        "{suggestion}"
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="chat"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex-1 flex flex-col pt-4"
                        >
                            <ChatInterface initialInput={initialInput} initialFiles={initialFiles} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
