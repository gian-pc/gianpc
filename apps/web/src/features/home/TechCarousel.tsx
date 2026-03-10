const technologies = ["Java", "Spring Boot", "PostgreSQL", "Docker", "AWS", "Microservices"];

export function TechCarousel() {
  return (
    <section id="stack" className="tech-standalone">
      <div className="container-shell tech-standalone-inner">
        {technologies.map((item) => (
          <span key={item} className="hero-chip">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
