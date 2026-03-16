"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/features/i18n/LanguageProvider";

type CostService = { name: string; amount: number };
type CostPayload = {
  currency: string;
  updatedAt: string;
  monthToDate: number;
  forecast: number;
  costExplorerApi?: number;
  services: CostService[];
};
type ServiceVisualKey = "lambda" | "cloudfront" | "s3" | "cost-explorer" | "tax" | "other";

const FALLBACK_SERVICES: CostService[] = [
  { name: "Lambda", amount: 0 },
  { name: "CloudFront", amount: 0 },
  { name: "S3", amount: 0 },
];

function toNumber(v: unknown) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function classifyService(name: string): { key: ServiceVisualKey; label: string } {
  const n = name.toLowerCase().trim();
  if (n.includes("lambda")) return { key: "lambda", label: "Lambda" };
  if (n.includes("cloudfront")) return { key: "cloudfront", label: "CloudFront" };
  if (n === "s3" || n.includes("storage") || n.includes("simple storage")) return { key: "s3", label: "S3" };
  if (n.includes("cost explorer")) return { key: "cost-explorer", label: "Cost Explorer" };
  if (n === "tax" || n.includes("tax")) return { key: "tax", label: "Tax" };
  return { key: "other", label: name };
}

function serviceIcon(key: ServiceVisualKey) {
  if (key === "lambda") return "λ";
  if (key === "cloudfront") return "☁";
  if (key === "s3") return "▣";
  if (key === "cost-explorer") return "$";
  if (key === "tax") return "%";
  return "•";
}

function formatKpiAmount(value: number) {
  if (value > 0 && value < 0.01) return "< 0.01";
  return value.toFixed(2);
}

function formatServiceAmount(value: number) {
  if (value > 0 && value < 0.01) return "< 0.01";
  return value.toFixed(2);
}

export function CostControlCard() {
  const [data, setData] = useState<CostPayload | null>(null);
  const { language } = useLanguage();
  const copy =
    language === "es"
      ? {
          cardLabel: "Control de costos AWS",
          title: "Control de costos",
          updated: "Última actualización",
          noData: "sin datos",
          kpiLabel: "Métricas principales",
          accumulated: "Acumulado",
          forecast: "Proyección",
          servicesLabel: "Top servicios",
          impactLabel: "Costo por servicio",
          barsBasis: "% del acumulado mensual",
          ceApi: "API Cost Explorer (estimado)",
        }
      : {
          cardLabel: "AWS cost control",
          title: "Cost control",
          updated: "Last update",
          noData: "no data",
          kpiLabel: "Main metrics",
          accumulated: "Accumulated",
          forecast: "Forecast",
          servicesLabel: "Top services",
          impactLabel: "Cost by service",
          barsBasis: "% of month-to-date total",
          ceApi: "Cost Explorer API (estimated)",
        };

  useEffect(() => {
    let cancelled = false;
    let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

    async function load() {
      try {
        const res = await fetch("/aws/costs/latest.json", { cache: "no-store" });
        if (!res.ok) return null;
        const json = (await res.json()) as CostPayload;
        if (!cancelled) setData(json);
        return json;
      } catch {
        // keep fallback UI
        return null;
      }
    }

    function scheduleNextRefresh(latest: CostPayload | null) {
      const now = Date.now();
      const updatedAtMs = latest?.updatedAt ? Date.parse(latest.updatedAt) : Number.NaN;
      const dayMs = 24 * 60 * 60 * 1000;
      const safetyWindowMs = 5 * 60 * 1000;
      const retryWindowMs = 60 * 60 * 1000;

      const targetMs = Number.isFinite(updatedAtMs)
        ? updatedAtMs + dayMs + safetyWindowMs
        : now + retryWindowMs;

      const delayMs = Math.max(60 * 1000, targetMs - now);
      refreshTimeout = setTimeout(async () => {
        const next = await load();
        if (!cancelled) scheduleNextRefresh(next);
      }, delayMs);
    }

    void (async () => {
      const latest = await load();
      if (!cancelled) scheduleNextRefresh(latest);
    })();

    return () => {
      cancelled = true;
      if (refreshTimeout) clearTimeout(refreshTimeout);
    };
  }, []);

  const services = useMemo(() => {
    const raw = data?.services?.length ? data.services : FALLBACK_SERVICES;
    const prioritizedOrder: Partial<Record<ServiceVisualKey, number>> = {
      s3: 0,
      cloudfront: 1,
      lambda: 2,
    };

    return raw
      .map((s) => {
      const visual = classifyService(s.name);
      return { key: visual.key, name: visual.label, amount: toNumber(s.amount) };
      })
      .sort((a, b) => {
        const aRank = prioritizedOrder[a.key] ?? 99;
        const bRank = prioritizedOrder[b.key] ?? 99;
        if (aRank !== bRank) return aRank - bRank;
        return b.amount - a.amount;
      });
  }, [data]);

  const updatedLabel = data?.updatedAt
    ? new Intl.DateTimeFormat(language === "es" ? "es-PE" : "en-US", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(data.updatedAt))
    : copy.noData;

  const currency = data?.currency || "USD";
  const monthToDate = toNumber(data?.monthToDate);
  const forecast = toNumber(data?.forecast);
  const costExplorerServiceAmount = services.find((service) => service.key === "cost-explorer")?.amount;
  const ceApi = toNumber(
    costExplorerServiceAmount != null && costExplorerServiceAmount > 0
      ? costExplorerServiceAmount
      : data?.costExplorerApi,
  );

  return (
    <article className="cost-card" aria-label={copy.cardLabel}>
      <header className="cost-card-head">
        <div className="cost-card-title-wrap">
          <AwsLogo />
          <h3>{copy.title}</h3>
        </div>
        <p className="cost-card-updated-inline">
          <span>{copy.updated}</span>
          <span>{updatedLabel}</span>
        </p>
      </header>

      <section className="cost-kpis" aria-label={copy.kpiLabel}>
        <div className="cost-kpi-card">
          <p>{copy.accumulated}</p>
          <strong>
            {currency} {formatKpiAmount(monthToDate)}
          </strong>
        </div>
        <div className="cost-kpi-card">
          <p>{copy.forecast}</p>
          <strong>
            {currency} {formatKpiAmount(forecast)}
          </strong>
        </div>
      </section>

      <section className="cost-services" aria-label={copy.servicesLabel}>
        <div className="cost-services-head">
          <p>{copy.servicesLabel}</p>
          <span>{copy.impactLabel}</span>
        </div>
        <p className="cost-services-note">{copy.barsBasis}</p>

        {services.map((service) => {
          const ratio = monthToDate > 0 ? Math.min(100, (service.amount / monthToDate) * 100) : 0;

          return (
            <div key={`${service.name}-${service.amount}`} className="cost-service-item">
              <div className="cost-service-row">
                <div className="cost-service-main">
                  <span className={`cost-service-icon cost-service-icon-${service.key}`}>{serviceIcon(service.key)}</span>
                  <span>{service.name}</span>
                </div>
                <span className="cost-service-amount">
                  {currency} {formatServiceAmount(service.amount)}
                </span>
              </div>
              <div className="cost-service-bar" aria-hidden="true">
                <span style={{ width: `${ratio}%` }} />
              </div>
            </div>
          );
        })}

        <div className="cost-service-extra">
          <span className="cost-service-extra-label">{copy.ceApi}</span>
          <span className="cost-service-extra-amount">
            {currency} {ceApi.toFixed(2)}
          </span>
        </div>
      </section>
    </article>
  );
}

function AwsLogo() {
  return (
    <svg className="cost-card-brand-logo" viewBox="0 0 56 22" aria-label="AWS logo" role="img">
      <text x="28" y="14" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif">
        aws
      </text>
      <path d="M14 17c5 3 23 3 28 0" fill="none" stroke="#ff9900" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
