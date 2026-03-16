import type { Metadata } from "next";
import { Hero } from "@/features/home/Hero";
import { Projects } from "@/features/home/Projects";

export const metadata: Metadata = {
  title: "Java Backend Developer",
  description: "Portfolio de Java Backend Developer con proyectos en Spring Boot, APIs REST y arquitectura en AWS.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "gianpc | Java Backend Developer",
    description: "Proyectos backend reales con Java, Spring Boot y AWS.",
    url: "https://gianpc.com",
    type: "website",
    images: [
      {
        url: "/avatar.png",
        alt: "gianpc portfolio",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <Projects />
    </main>
  );
}
