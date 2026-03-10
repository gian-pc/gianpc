import { Hero } from "@/features/home/Hero";
import { Projects } from "@/features/home/Projects";

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <Projects />
    </main>
  );
}
