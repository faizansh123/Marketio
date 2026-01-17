"use client";

import * as React from "react";

import Link from "next/link";
import { Button } from "./ui/button";
import { Copy, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent"}`}>
            <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img src="/assets/logo.png" alt="Marketio" className="h-10 w-auto object-contain" />
                    <span className="text-2xl font-extrabold tracking-tighter text-[#0f172a] font-[family-name:var(--font-poppins)]">marketio</span>
                </Link>

                {/* Center Links - Clean & Simple */}
                <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    {["How it Works", "Features", "Workflow"].map((item) => (
                        <Link 
                            key={item}
                            href={`#${item.toLowerCase().replace(/ /g, "-")}`} 
                            className="text-sm font-medium text-muted-foreground hover:text-indigo-600 transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <Link href="/login" className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Sign in
                    </Link>
                    <Button variant="default" className="rounded-md px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md active:scale-95 transition-all">
                        Get Started
                    </Button>
                    <div className="ml-2">
                         <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
