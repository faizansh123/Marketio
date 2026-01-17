export function Footer() {
    return (
        <footer className="py-12 border-t border-border bg-muted/30 text-center">
            <div className="container mx-auto px-4 flex flex-col items-center gap-4">
                <p className="text-muted-foreground text-sm">
                    © {new Date().getFullYear()} Marketio. Built for UofTHacks 13.
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 hover:text-blue-500 transition-colors"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Powered by Google Gemini</span>
                    <span className="hidden md:inline text-muted-foreground/50">•</span>
                    <span className="hover:text-foreground transition-colors">Next.js</span>
                </div>
            </div>
        </footer>
    );
}
