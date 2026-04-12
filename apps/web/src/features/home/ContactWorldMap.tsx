"use client";

import { useEffect, useMemo, useState } from "react";

type Point = [number, number];
type Ring = Point[];
type Polygon = Ring[];
type MultiPolygon = Polygon[];

type GeoGeometry =
  | { type: "Polygon"; coordinates: Polygon }
  | { type: "MultiPolygon"; coordinates: MultiPolygon };

type GeoFeature = {
  geometry: GeoGeometry | null;
};

type GeoFeatureCollection = {
  type: "FeatureCollection";
  features: GeoFeature[];
};

type ContactWorldMapProps = {
  timezoneLabel?: string;
};

const MAP_WIDTH = 1600;
const MAP_HEIGHT = 900;
const LIMA_COORDS: Point = [-77.0428, -12.0464];
const FOCUS_FRAME = {
  x: 60,
  y: 130,
  width: 1180,
  height: 620,
};

const FALLBACK_PATHS = [
  "M132 230 L176 188 L244 168 L330 160 L415 168 L492 194 L544 232 L546 274 L518 305 L468 314 L430 335 L392 360 L352 365 L304 356 L258 334 L214 303 L178 270 Z",
  "M350 388 L395 373 L439 386 L468 420 L486 468 L488 518 L475 563 L450 618 L418 672 L390 731 L364 782 L335 815 L315 790 L313 742 L331 699 L343 655 L332 608 L314 554 L304 501 L307 450 Z",
  "M430 112 L471 88 L522 92 L553 124 L548 165 L520 189 L477 196 L437 178 L421 144 Z",
  "M644 188 L700 164 L778 152 L878 148 L972 156 L1060 170 L1138 188 L1220 218 L1304 252 L1380 292 L1412 328 L1404 358 L1368 374 L1312 378 L1247 371 L1188 379 L1128 394 L1062 401 L992 396 L924 381 L858 360 L792 330 L738 300 L694 266 L664 231 Z",
  "M858 414 L910 402 L960 412 L999 440 L1023 476 L1028 522 L1014 566 L989 604 L958 642 L928 666 L888 680 L865 655 L866 619 L848 586 L834 541 L828 497 L832 456 Z",
  "M1218 578 L1272 564 L1329 571 L1364 597 L1372 630 L1353 658 L1310 675 L1258 678 L1218 660 L1199 630 Z",
  "M1276 188 L1313 172 L1348 180 L1370 203 L1372 233 L1355 255 L1324 263 L1292 252 L1270 230 Z",
];

function projectPoint([lon, lat]: Point): Point {
  const x = ((lon + 180) / 360) * MAP_WIDTH;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return [x, y];
}

function quantizePoint([x, y]: Point): Point {
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function pointKey(point: Point): string {
  const [x, y] = quantizePoint(point);
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}

function addSegment(
  ring: Ring,
  segmentCount: Map<string, number>,
  segmentPath: Map<string, string>,
): void {
  if (ring.length < 2) return;

  for (let i = 0; i < ring.length - 1; i += 1) {
    const a = pointKey(projectPoint(ring[i]));
    const b = pointKey(projectPoint(ring[i + 1]));
    if (a === b) continue;

    const canonical = a < b ? `${a}|${b}` : `${b}|${a}`;
    segmentCount.set(canonical, (segmentCount.get(canonical) ?? 0) + 1);
    if (!segmentPath.has(canonical)) {
      segmentPath.set(canonical, `M${a.replace(",", " ")} L${b.replace(",", " ")}`);
    }
  }

  const first = pointKey(projectPoint(ring[0]));
  const last = pointKey(projectPoint(ring[ring.length - 1]));
  if (first === last) return;

  const canonical = first < last ? `${first}|${last}` : `${last}|${first}`;
  segmentCount.set(canonical, (segmentCount.get(canonical) ?? 0) + 1);
  if (!segmentPath.has(canonical)) {
    segmentPath.set(canonical, `M${last.replace(",", " ")} L${first.replace(",", " ")}`);
  }
}

function geometryRings(geometry: GeoGeometry): Ring[] {
  if (geometry.type === "Polygon") return geometry.coordinates;
  return geometry.coordinates.flat();
}

function extractPaths(json: GeoFeatureCollection): string[] {
  if (!json.features?.length) return FALLBACK_PATHS;

  const segmentCount = new Map<string, number>();
  const segmentPath = new Map<string, string>();

  for (const feature of json.features) {
    if (!feature.geometry) continue;

    const rings = geometryRings(feature.geometry);
    for (const ring of rings) {
      addSegment(ring, segmentCount, segmentPath);
    }
  }

  const coastlinePaths = Array.from(segmentCount.entries())
    .filter(([, count]) => count === 1)
    .map(([key]) => segmentPath.get(key))
    .filter((path): path is string => Boolean(path));

  return coastlinePaths.length ? coastlinePaths : FALLBACK_PATHS;
}

export function ContactWorldMap({ timezoneLabel = "UTC-5 · Lima" }: ContactWorldMapProps) {
  const [paths, setPaths] = useState<string[]>(FALLBACK_PATHS);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/world.geojson", { cache: "force-cache" });
        if (!response.ok) return;
        const json = (await response.json()) as GeoFeatureCollection;
        const nextPaths = extractPaths(json);
        if (!cancelled && nextPaths.length) setPaths(nextPaths);
      } catch {
        // keep fallback
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const [limaX, limaY] = useMemo(() => projectPoint(LIMA_COORDS), []);

  return (
    <div className="contact-world-map" aria-hidden="true">
      <svg
        viewBox={`${FOCUS_FRAME.x} ${FOCUS_FRAME.y} ${FOCUS_FRAME.width} ${FOCUS_FRAME.height}`}
        preserveAspectRatio="xMidYMid slice"
        className="contact-world-svg"
      >
        <g className="contact-world-masses">
          {paths.map((d, index) => (
            <path key={`${index}-${d.length}`} d={d} />
          ))}
        </g>

        <g className="contact-world-marker" transform={`translate(${limaX} ${limaY})`}>
          <circle className="contact-world-wave contact-world-wave-1" cx="0" cy="0" r="9.2" />
          <circle className="contact-world-wave contact-world-wave-2" cx="0" cy="0" r="9.2" />
          <circle className="contact-world-ring" cx="0" cy="0" r="10.4" />
          <circle className="contact-world-dot" cx="0" cy="0" r="6.3" />
        </g>
      </svg>

      <div className="contact-world-vignette" />
      <span className="contact-world-timezone">{timezoneLabel}</span>
    </div>
  );
}
