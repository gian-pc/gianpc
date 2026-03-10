import path from "node:path";
import { readFileSync } from "node:fs";
import type { CSSProperties } from "react";

const MAP_SHIFT_X_PERCENT = 13.5;
const LIMA_COORDS: Point = [-77.0428, -12.0464];
const MAP_WIDTH = 1600;
const MAP_HEIGHT = 900;

// Real world boundaries (GeoJSON)
const LOCAL_WORLD_GEOJSON_CANDIDATES = [
  path.join(process.cwd(), "public/world.geojson"),
  path.join(process.cwd(), "apps/web/public/world.geojson"),
];

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

const FALLBACK_PATHS = [
  "M132 230 L176 188 L244 168 L330 160 L415 168 L492 194 L544 232 L546 274 L518 305 L468 314 L430 335 L392 360 L352 365 L304 356 L258 334 L214 303 L178 270 Z",
  "M350 388 L395 373 L439 386 L468 420 L486 468 L488 518 L475 563 L450 618 L418 672 L390 731 L364 782 L335 815 L315 790 L313 742 L331 699 L343 655 L332 608 L314 554 L304 501 L307 450 Z",
  "M430 112 L471 88 L522 92 L553 124 L548 165 L520 189 L477 196 L437 178 L421 144 Z",
  "M644 188 L700 164 L778 152 L878 148 L972 156 L1060 170 L1138 188 L1220 218 L1304 252 L1380 292 L1412 328 L1404 358 L1368 374 L1312 378 L1247 371 L1188 379 L1128 394 L1062 401 L992 396 L924 381 L858 360 L792 330 L738 300 L694 266 L664 231 Z",
  "M858 414 L910 402 L960 412 L999 440 L1023 476 L1028 522 L1014 566 L989 604 L958 642 L928 666 L888 680 L865 655 L866 619 L848 586 L834 541 L828 497 L832 456 Z",
  "M1218 578 L1272 564 L1329 571 L1364 597 L1372 630 L1353 658 L1310 675 L1258 678 L1218 660 L1199 630 Z",
  "M1276 188 L1313 172 L1348 180 L1370 203 L1372 233 L1355 255 L1324 263 L1292 252 L1270 230 Z",
  "M70 792 L220 782 L386 776 L561 778 L739 786 L930 797 L1123 806 L1308 818 L1494 830",
];

function projectPoint([lon, lat]: Point): Point {
  const shiftPixels = (MAP_SHIFT_X_PERCENT / 100) * MAP_WIDTH;
  const x = ((lon + 180) / 360) * MAP_WIDTH + shiftPixels;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return [Number(x.toFixed(2)), Number(y.toFixed(2))];
}

function simplifyRing(ring: Ring): Ring {
  const size = ring.length;
  if (size < 80) return ring;

  const step = size > 260 ? 4 : size > 140 ? 3 : 2;
  const reduced: Ring = [ring[0]];

  for (let i = step; i < size - 1; i += step) {
    reduced.push(ring[i]);
  }

  reduced.push(ring[size - 1]);
  return reduced;
}

function ringToPath(ring: Ring): string {
  if (!ring.length) return "";

  const simple = simplifyRing(ring);
  const [first, ...rest] = simple;
  const [x0, y0] = projectPoint(first);
  let d = `M${x0} ${y0}`;

  for (const point of rest) {
    const [x, y] = projectPoint(point);
    d += ` L${x} ${y}`;
  }

  return `${d} Z`;
}

function polygonToPath(polygon: Polygon): string {
  return polygon.map(ringToPath).filter(Boolean).join(" ");
}

function geometryToPath(geometry: GeoGeometry): string {
  if (geometry.type === "Polygon") {
    return polygonToPath(geometry.coordinates);
  }
  return geometry.coordinates.map(polygonToPath).filter(Boolean).join(" ");
}

function extractPaths(json: GeoFeatureCollection): string[] {
  if (!json.features?.length) return [];
  return json.features
    .map((feature) =>
      feature.geometry ? geometryToPath(feature.geometry) : "",
    )
    .filter(Boolean);
}

function getWorldPaths(): string[] {
  // Prefer local file to avoid runtime network dependency.
  for (const filePath of LOCAL_WORLD_GEOJSON_CANDIDATES) {
    try {
      const raw = readFileSync(filePath, "utf8");
      const json = JSON.parse(raw) as GeoFeatureCollection;
      const paths = extractPaths(json);
      if (paths.length) {
        return paths;
      }
    } catch {
      continue;
    }
  }

  // Last-resort fallback in case local file is missing.
  return FALLBACK_PATHS;
}

const WORLD_PATHS = getWorldPaths();

export function HeroMapBackground() {
  const paths = WORLD_PATHS;
  const [limaX, limaY] = projectPoint(LIMA_COORDS);
  const limaLeftPercent = (limaX / MAP_WIDTH) * 100;
  const limaTopPercent = (limaY / MAP_HEIGHT) * 100;

  const cssVars = {
    "--hero-lima-left": `${limaLeftPercent.toFixed(2)}%`,
    "--hero-lima-top": `${limaTopPercent.toFixed(2)}%`,
  } as CSSProperties;

  return (
    <div className="hero-map-bg" aria-hidden="true" style={cssVars}>
      <svg
        className="hero-map-svg"
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="hero-map-masses">
          {paths.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </g>
      </svg>

      <div className="hero-map-vignette" />

      <div
        className="hero-map-marker"
        style={{ left: "var(--hero-lima-left)", top: "var(--hero-lima-top)" }}
      >
        <span className="hero-map-ring" />
        <span className="hero-map-dot" />
      </div>
    </div>
  );
}
