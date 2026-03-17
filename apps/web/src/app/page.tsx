import type { Metadata } from "next";
import { Hero } from "@/features/home/Hero";
import { Projects } from "@/features/home/Projects";
import { ContactSection } from "@/features/home/ContactSection";

export const metadata: Metadata = {
  title: "Software Developer",
  description: "Portfolio con proyectos backend reales, arquitectura moderna y cloud.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "gianpc | Software Developer",
    description: "Proyectos backend reales con arquitectura moderna y cloud.",
    url: "https://gianpc.com",
    type: "website",
    images: [
      {
        url: "/og-cover.jpg?v=2",
        width: 1200,
        height: 630,
        type: "image/jpeg",
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
      <ContactSection />
    </main>
  );
}
