const topServices = [
  { key: "lambda", name: "Lambda", amount: 52.3, ratio: 100, icon: "λ" },
  { key: "cloudfront", name: "CloudFront", amount: 34.1, ratio: 65, icon: "☁" },
  { key: "s3", name: "S3", amount: 21.8, ratio: 42, icon: "▣" },
];

export function CostControlCard() {
  return (
    <article className="cost-card" aria-label="Control de costos AWS">
      <header className="cost-card-head">
        <AwsLogo />
        <h3>Control de costos</h3>
      </header>

      <p className="cost-card-updated">Última actualización · 07-mar · 05:40 p. m.</p>

      <section className="cost-kpis" aria-label="Métricas principales">
        <div className="cost-kpi-card">
          <p>Acumulado</p>
          <strong>USD 124.80</strong>
        </div>
        <div className="cost-kpi-card">
          <p>Proyección</p>
          <strong>USD 186.40</strong>
        </div>
      </section>

      <section className="cost-services" aria-label="Top servicios">
        <div className="cost-services-head">
          <p>Top servicios</p>
          <span>Mayor impacto en costo</span>
        </div>

        {topServices.map((service) => (
          <div key={service.key} className="cost-service-item">
            <div className="cost-service-row">
              <div className="cost-service-main">
                <span className={`cost-service-icon cost-service-icon-${service.key}`}>{service.icon}</span>
                <span>{service.name}</span>
              </div>
              <span className="cost-service-amount">USD {service.amount.toFixed(2)}</span>
            </div>
            <div className="cost-service-bar" aria-hidden="true">
              <span style={{ width: `${service.ratio}%` }} />
            </div>
          </div>
        ))}
      </section>
    </article>
  );
}

function AwsLogo() {
  return (
    <svg className="cost-card-brand-logo" viewBox="0 0 56 22" aria-label="AWS logo" role="img">
      <text
        x="28"
        y="14"
        textAnchor="middle"
        fill="currentColor"
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        aws
      </text>
      <path
        d="M14 17c5 3 23 3 28 0"
        fill="none"
        stroke="#ff9900"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
