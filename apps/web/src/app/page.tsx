import { Hero } from "@/features/home/Hero";
import { TechCarousel } from "@/features/home/TechCarousel";
import { Projects } from "@/features/home/Projects";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Hero />
      <TechCarousel />
      <Projects />
    </main>
  );
}