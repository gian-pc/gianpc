"use client";

import { useEffect, useState } from "react";

const output = `$ sst deploy --stage prod
✓ API Gateway ready
✓ Lambda contact-form deployed
✓ S3 assets synced
✓ CloudFront cache invalidated
Done in 14.2s`;

export function TerminalPreview() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setIndex(output.length);
      return;
    }
    if (index >= output.length) return;

    const id = window.setTimeout(() => {
      setIndex((prev) => Math.min(prev + 1, output.length));
    }, 18);

    return () => window.clearTimeout(id);
  }, [index, reducedMotion]);

  const text = output.slice(0, index);
  const finished = index >= output.length;

  return (
    <div
      style={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--terminal-border)",
        background: "var(--terminal-bg)",
        boxShadow: "var(--terminal-shadow)",
        overflow: "hidden",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          height: 36,
          borderBottom: "1px solid var(--terminal-border)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 12px",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: 99, background: "#ef4444" }} />
        <span style={{ width: 10, height: 10, borderRadius: 99, background: "#f59e0b" }} />
        <span style={{ width: 10, height: 10, borderRadius: 99, background: "#22c55e" }} />
      </div>

      <pre
        className="mono"
        style={{
          margin: 0,
          padding: 16,
          fontSize: 12,
          lineHeight: 1.7,
          color: "var(--text-secondary)",
          overflowX: "auto",
          minHeight: 164,
        }}
      >
        {text}
        {!finished && <span style={{ color: "var(--accent)" }}>|</span>}
      </pre>
    </div>
  );
}
