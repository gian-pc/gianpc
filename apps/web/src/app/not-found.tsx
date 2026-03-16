import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Página no encontrada",
  description: "La página solicitada no existe en gianpc.com.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="home-page">
      <section className="container-shell" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
        <p className="projects-kicker">404</p>
        <h1 className="projects-title">Página no encontrada</h1>
        <p className="hero-description" style={{ maxWidth: "42rem", marginTop: "1rem" }}>
          El enlace que abriste no existe o fue movido.
        </p>
        <div className="hero-actions" style={{ marginTop: "1.5rem" }}>
          <Link href="/" className="hero-btn hero-btn-primary">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
