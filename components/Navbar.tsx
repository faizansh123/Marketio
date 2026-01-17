"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Copy, Sparkles } from "lucide-react";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-black/5 backdrop-blur-xl border-b border-white/10">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Marketio
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it Works</Link>
                    <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link>
                    <Link href="#workflow" className="text-sm text-gray-400 hover:text-white transition-colors">Workflow</Link>
                    <Link href="/demo" className="text-sm text-gray-400 hover:text-white transition-colors">Demo</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/login" className="hidden md:block text-sm text-white hover:text-purple-400 transition-colors">Sign in</Link>
                    <Button variant="glow" size="sm">
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    );
}
