import { CostControlCard } from "./CostControlCard";

export function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="container-shell hero-grid">
        <div className="hero-copy">
          <span className="hero-kicker">Backend Developer</span>

          <h1 className="hero-title">
              <span className="hero-title-line">Backend</span>
              <span className="hero-title-accent">Developer</span>
          </h1>

          <p className="hero-description">
            Desarrollo APIs robustas y sistemas backend escalables utilizando Java, Spring Boot y arquitectura moderna
            orientada a productos.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="hero-btn hero-btn-primary">
              Ver proyectos
            </a>
            <a href="/cv/CV_GianPaucar_JavaBackend.pdf" download className="hero-btn hero-btn-secondary">
              Descargar CV
            </a>
          </div>
        </div>

        <div className="hero-terminal-wrap">
          <div className="hero-terminal-spot hero-terminal-spot-left" />
          <div className="hero-terminal-spot hero-terminal-spot-right" />
          <CostControlCard />
        </div>
      </div>
    </section>
  );
}
