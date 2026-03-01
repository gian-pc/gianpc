"use client";

const tech = [
  { name: "Java", slug: "openjdk" },
  { name: "AWS", slug: "amazonwebservices", src: "https://api.iconify.design/logos:aws.svg" },
  { name: "Spring Boot", slug: "springboot" },
  { name: "Linux", slug: "linux" },
  { name: "Docker", slug: "docker" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "GitHub", slug: "github" },
];


export function TechCarousel() {
  const loop = [...tech, ...tech];

  return (
    <section style={{ padding: "8px 24px 56px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="marquee-shell">
          <div className="marquee-track">
            {loop.map((item, i) => (
              <div key={`${item.slug}-${i}`} className="marquee-item" title={item.name}>
                <img
                  className="marquee-logo"
                  src={item.src ?? `https://cdn.simpleicons.org/${item.slug}`}
                  alt={item.name}
                  width={28}
                  height={28}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
