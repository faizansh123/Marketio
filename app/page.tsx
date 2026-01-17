import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Steps } from "@/components/Steps";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Steps />
      <Features />
      <Footer />
    </main>
  );
}
