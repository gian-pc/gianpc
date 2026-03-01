import { Hero } from "@/features/home/Hero";
import { TechCarousel } from "@/features/home/TechCarousel";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh" }}>
      <Hero />
      <TechCarousel />
    </main>
  );
}
