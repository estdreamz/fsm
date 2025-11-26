import axios from 'axios';
import { generateMockData, generateMockDataRange } from "../components/types/mockdata";
import type { WaterQualityDataPoint } from "../components/types/types";

export async function fetchWaterQuality(date?: string | Date, delayMs = 400): Promise<WaterQualityDataPoint[]> {
  // Try axios POST to a (possibly real or proxied) endpoint with a date payload.
  // If it fails, fall back to generated mock data.
  const payloadDate = date ? (typeof date === 'string' ? date : date.toISOString()) : new Date().toISOString();
  try {
    // Send POST using `application/x-www-form-urlencoded` to avoid JSON preflight while
    // still using POST semantics. Many servers accept form-encoded POST bodies.
    const payload = { farm_id: 'T001', pond_id: '01', limit: '2000', date_: payloadDate };
    // Use relative path so dev server proxy can forward to the real host and avoid CORS.
    const res = await axios.post('/api/get_iot2.api', payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 3000,
    });
    console.log("res.data",res.data);
    console.log("payload",payload);
    
    // Try to return the array from common response shapes
    if (res && res.data) {
      if (Array.isArray(res.data)) return res.data as WaterQualityDataPoint[];
      if (Array.isArray((res.data as any).data)) return (res.data as any).data as WaterQualityDataPoint[];
      // some APIs return { success: true, data: [...] }
      if (res.data && Array.isArray((res.data as any).rows)) return (res.data as any).rows as WaterQualityDataPoint[];
    }
      if (Array.isArray((res.data as any).data)) return (res.data as any).data as WaterQualityDataPoint[];
    
  } catch (e) {
    // ignore and fall back to mock
    console.log("res",e);
    
    await new Promise((r) => setTimeout(r, delayMs));
    return generateMockDataRange(0, 23);
  }

  // // fallback: simulate small network delay and return generated mock data for 00:00-09:00
  // await new Promise((r) => setTimeout(r, delayMs));
  return []; // no data};
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
    const payload = { date_: payloadDate };
    const res = await axios.post<EcommerceMetricsData>('/api/get_iot2.api', payload, { headers: { 'Content-Type': 'application/json' }, timeout: 2000 });
    if (res && res.data) return res.data;
  } catch (e) {
    // ignore
    console.log("res2",e);
    
  };

  return {
    yieldEstimate: '- ตัน',
    yieldModel: '2025-Q4',
    survivalRate: '- %',
    survivalNote: 'สุขภาพดี',
    avgDO: '-  mg/L',
    avgDONote: 'เป้าหมาย ≥ -',
    feedTotal: '-  กก.',
    feedNote: 'ตามแผน'
  }

  // await new Promise((r) => setTimeout(r, delayMs));
  // Simple mocked values (could be derived from generateMockData)
  
}
