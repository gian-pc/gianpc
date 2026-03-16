import { CostExplorerClient, GetCostAndUsageCommand, GetCostForecastCommand } from "@aws-sdk/client-cost-explorer";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const ce = new CostExplorerClient({ region: "us-east-1" });
const s3 = new S3Client({ region: "us-east-1" });

const BUCKET = process.env.BUCKET_NAME;
const KEY = process.env.OBJECT_KEY || "aws/costs/latest.json";
const CURRENCY = "USD";

// CE API pricing reference used for estimate in card metadata.
const COST_EXPLORER_API_PRICE_PER_CALL_USD = 0.01;

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

function firstDayOfMonthUTC(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function tomorrowUTC(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1));
}

function endOfMonthUTC(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1));
}

function round2(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

function round6(n) {
  return Math.round((Number(n) + Number.EPSILON) * 1000000) / 1000000;
}

function monthKeyFromIso(isoString) {
  if (typeof isoString !== "string" || isoString.length < 7) return null;
  return isoString.slice(0, 7);
}

async function readPreviousPayload() {
  try {
    const resp = await s3.send(
      new GetObjectCommand({
        Bucket: BUCKET,
        Key: KEY,
      }),
    );

    const body = await resp.Body?.transformToString();
    if (!body) return null;

    return JSON.parse(body);
  } catch (error) {
    const statusCode = error?.$metadata?.httpStatusCode;
    if (statusCode === 404 || error?.name === "NoSuchKey" || error?.name === "NotFound") {
      return null;
    }
    throw error;
  }
}

export const handler = async () => {
  if (!BUCKET) {
    throw new Error("Missing BUCKET_NAME env var");
  }

  const now = new Date();
  const start = formatDate(firstDayOfMonthUTC(now));
  const endExclusive = formatDate(tomorrowUTC(now));
  const monthEnd = formatDate(endOfMonthUTC(now));

  // 1) Month-to-date total
  const totalResp = await ce.send(
    new GetCostAndUsageCommand({
      TimePeriod: { Start: start, End: endExclusive },
      Granularity: "MONTHLY",
      Metrics: ["UnblendedCost"],
    }),
  );

  const monthToDate = round6(
    totalResp.ResultsByTime?.[0]?.Total?.UnblendedCost?.Amount ?? "0",
  );

  // 2) Top services
  const groupResp = await ce.send(
      new GetCostAndUsageCommand({
      TimePeriod: { Start: start, End: endExclusive },
      Granularity: "MONTHLY",
      Metrics: ["UnblendedCost"],
      GroupBy: [{ Type: "DIMENSION", Key: "SERVICE" }],
    }),
  );

  const groups = groupResp.ResultsByTime?.[0]?.Groups ?? [];
  const services = groups
    .map((g) => ({
      name: g.Keys?.[0] ?? "Other",
      amount: round6(g.Metrics?.UnblendedCost?.Amount ?? "0"),
    }))
    .filter((s) => s.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  // 3) Forecast end of month (total monthly forecast from CE API)
  let forecast = monthToDate;
  try {
    const forecastResp = await ce.send(
      new GetCostForecastCommand({
        TimePeriod: { Start: endExclusive, End: monthEnd },
        Metric: "UNBLENDED_COST",
        Granularity: "MONTHLY",
      }),
    );
    forecast = round6(forecastResp.Total?.Amount ?? monthToDate);
  } catch {
    // Fallback if forecast is unavailable early in cycle.
    forecast = monthToDate;
  }

  const apiCalls = 3; // total + grouped + forecast
  const costExplorerApiPerRun = round2(apiCalls * COST_EXPLORER_API_PRICE_PER_CALL_USD);

  // CE API shown in card is monthly accumulated estimate, not just per-run value.
  const previousPayload = await readPreviousPayload();
  const currentMonth = now.toISOString().slice(0, 7);
  const previousMonth = monthKeyFromIso(previousPayload?.updatedAt);
  const previousCeApiMtd =
    previousMonth === currentMonth ? round2(previousPayload?.costExplorerApi ?? 0) : 0;
  const costExplorerApi = round2(previousCeApiMtd + costExplorerApiPerRun);

  const payload = {
    currency: CURRENCY,
    updatedAt: now.toISOString(),
    monthToDate,
    forecast,
    costExplorerApi,
    costExplorerApiPerRun,
    services,
  };

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: KEY,
      Body: JSON.stringify(payload, null, 2),
      ContentType: "application/json",
      CacheControl: "max-age=300",
    }),
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, key: `${BUCKET}/${KEY}`, payload }),
  };
};
