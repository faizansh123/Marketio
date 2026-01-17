"use client";

import { useState, useRef, useEffect } from "react";
import { Paperclip, ArrowUp, X, FileIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GeneratorInputProps {
    onGenerate?: (input: string, files: File[]) => void;
    className?: string;
    placeholder?: string;
}

export function GeneratorInput({ onGenerate, className, placeholder }: GeneratorInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = inputRef.current.scrollHeight + "px";
        }
    }, [inputValue]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.target.files as FileList)]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (!inputValue.trim() && files.length === 0) return;
        
        if (onGenerate) {
            onGenerate(inputValue, files);
        } else {
            console.log("Generating with:", inputValue, files);
        }
        
        // Clear inputs
        setInputValue("");
        setFiles([]);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
                {/* File Previews */}
                <AnimatePresence>
                    {files.length > 0 && (
                        <div className="px-4 pt-4 flex flex-wrap gap-2">
                            {files.map((file, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground"
                                >
                                    <FileIcon className="w-3 h-3 text-indigo-500" />
                                    <span className="max-w-[150px] truncate">{file.name}</span>
                                    <button 
                                        onClick={() => removeFile(i)}
                                        className="hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                <div className="p-2 flex items-end gap-2">
                    {/* Attachment Button */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        multiple 
                        onChange={handleFileSelect}
                    />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors shrink-0"
                        title="Attach files"
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>

                    {/* Text Input */}
                    <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={placeholder || "Describe your niche or product..."}
                        className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none text-foreground placeholder:text-muted-foreground resize-none py-3 max-h-[200px] overflow-y-auto"
                        rows={1}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}
                    />

                    {/* Send Button */}
                    <button 
                        onClick={handleSubmit}
                        disabled={!inputValue.trim() && files.length === 0}
                        className={cn(
                            "p-2 rounded-xl transition-all duration-200 shrink-0",
                            inputValue.trim() || files.length > 0
                                ? "bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/25" 
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                        )}
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
