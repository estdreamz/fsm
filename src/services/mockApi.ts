import axios from 'axios';
import { generateMockData, generateMockDataRange } from "../components/types/mockdata";
import type { WaterQualityDataPoint } from "../components/types/types";

export async function fetchWaterQuality(date?: string | Date, delayMs = 400): Promise<WaterQualityDataPoint[]> {
  // Try axios POST to a (possibly real or proxied) endpoint with a date payload.
  // If it fails, fall back to generated mock data.
  const payloadDate = date ? (typeof date === 'string' ? date : date.toISOString()) : new Date().toISOString();
  try {
    const res = await axios.post<WaterQualityDataPoint[]>('/api/water-quality', { date: payloadDate }, { timeout: 3000 });
    if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (e) {
    // ignore and fall back to mock
  }

  // fallback: simulate small network delay and return generated mock data for 00:00-09:00
  await new Promise((r) => setTimeout(r, delayMs));
  return generateMockDataRange(0, 9);
}

export type EcommerceMetricsData = {
  yieldEstimate: string;
  yieldModel: string;
  survivalRate: string;
  survivalNote: string;
  avgDO: string;
  avgDONote: string;
  feedTotal: string;
  feedNote: string;
};

export async function fetchEcommerceMetrics(date?: string | Date, delayMs = 200): Promise<EcommerceMetricsData> {
  // Try POST to /api/metrics, fallback to generated values
  const payloadDate = date ? (typeof date === 'string' ? date : date.toISOString()) : new Date().toISOString();
  try {
    const res = await axios.post<EcommerceMetricsData>('/api/metrics', { date: payloadDate }, { timeout: 2000 });
    if (res && res.data) return res.data;
  } catch (e) {
    // ignore
  }

  await new Promise((r) => setTimeout(r, delayMs));
  // Simple mocked values (could be derived from generateMockData)
  return {
    yieldEstimate: '6.8 ตัน',
    yieldModel: '2025-Q4',
    survivalRate: '91%',
    survivalNote: 'สุขภาพดี',
    avgDO: '5.9 mg/L',
    avgDONote: 'เป้าหมาย ≥ 5',
    feedTotal: '80 กก.',
    feedNote: 'ตามแผน'
  };
}
