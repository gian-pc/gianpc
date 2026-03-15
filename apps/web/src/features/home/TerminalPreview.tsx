"use client";

import { useEffect, useState } from "react";

const lines = [
  { text: "$ ./mvnw spring-boot:run", tone: "muted" },
  { text: "✓ application started", tone: "ok" },
  { text: "POST /api/v1/orders", tone: "default" },
  { text: '{status:"ok"}', tone: "accent" },
  { text: "GET /api/v1/reputation", tone: "default" },
  { text: '{focus:"backend", growth:"systems + ai"}', tone: "accent" },
] as const;

export function TerminalPreview() {
  const [visibleLines, setVisibleLines] = useState<string[]>(() => lines.map(() => ""));
  const [cursorLine, setCursorLine] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const typeLine = (lineIndex: number, charIndex: number) => {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setIsFinished(true);
        return;
      }

      setCursorLine(lineIndex);
      const text = lines[lineIndex].text;
      const safeCharIndex = Math.min(charIndex, text.length);

      setVisibleLines((prev) => {
        const next = [...prev];
        next[lineIndex] = text.slice(0, safeCharIndex);
        return next;
      });

      if (safeCharIndex < text.length) {
        timeoutId = setTimeout(() => typeLine(lineIndex, safeCharIndex + 1), 24);
        return;
      }

      timeoutId = setTimeout(() => typeLine(lineIndex + 1, 0), 180);
    };

    timeoutId = setTimeout(() => typeLine(0, 0), 180);

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="terminal-card" role="presentation" aria-hidden="true">
      <div className="terminal-topbar">
        <span className="terminal-light light-red" />
        <span className="terminal-light light-yellow" />
        <span className="terminal-light light-green" />
      </div>

      <div className="terminal-content mono">
        {lines.map((line, index) => (
          <p key={line.text} className={line.tone === "default" ? "terminal-line" : `terminal-line ${line.tone}`}>
            {visibleLines[index]}
            {!isFinished && cursorLine === index ? <span className="terminal-caret">▋</span> : null}
          </p>
        ))}
      </div>
    </div>
  );
}
