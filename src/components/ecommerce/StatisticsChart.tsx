// This file contains the WaterQualityChart component
// This file contains the WaterQualityChart component
import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { WaterQualityDataPoint } from '../../components/types/types';

interface WaterQualityChartProps {
  data: WaterQualityDataPoint[];
}

const WaterQualityChart: React.FC<WaterQualityChartProps> = ({ data }) => {
  // base timestamp set to today at 00:00 (midnight)
  const baseMs = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }, []);

  // convert series to [{ x: timestamp(ms), y: value }, ...]
  const series = useMemo(() => [
    { name: 'Temp (C)', data: data.map((d, i) => ({ x: baseMs + i * 60_000, y: d.temp })), color: '#93C5FD' },
    { name: 'DO (mg/L)', data: data.map((d, i) => ({ x: baseMs + i * 60_000, y: d.do })), color: '#3B82F6' },
    { name: 'pH', data: data.map((d, i) => ({ x: baseMs + i * 60_000, y: d.ph })), color: '#6366F1' }
  ], [data, baseMs]);

  // Fix x-axis to a full 24-hour range starting at midnight (00:00).
  // The chart axis is independent of the provided data length.
  const minX = baseMs;
  const minutesProvided = 24 * 60; // ignore data length; display full day
  const maxX = baseMs + (minutesProvided - 1) * 60_000;

  // No annotations: rely on x-axis labels for 3-hour markers

  // exact tick timestamps for 00:00, 03:00, 06:00, ... — include ticks that fall within
  // the visible range, with a small tolerance so near-boundary labels are not dropped.
  const threeHourTicks = useMemo(() => {
    const TOL = 3 * 60 * 1000; // 3 minutes tolerance
    const ticks: number[] = [];
    for (let h = 0; h < 24; h += 3) {
      const t = baseMs + h * 60 * 60 * 1000;
      if (t + TOL >= minX && t - TOL <= maxX) ticks.push(t);
    }
    return ticks;
  }, [baseMs, minX, maxX]);

  const options: ApexOptions = {
    chart: { type: 'area', height: 350, fontFamily: 'Sarabun, Inter, sans-serif', background: 'transparent', toolbar: { show: false }, animations: { enabled: true, speed: 800 }, zoom: { enabled: false }, selection: { enabled: false } },
    theme: { mode: 'dark' },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05, stops: [0, 90, 100] } },
    xaxis: {
      type: 'datetime',
      min: minX,
      max: maxX,
      // show axis border and ticks so 3-hour positions are visible
      axisBorder: { show: true, color: '#334155' },
      axisTicks: { show: true, color: '#334155' },
      labels: {
        show: true,
        datetimeUTC: false,
        // Prevent ApexCharts from hiding labels that it considers overlapping.
        hideOverlappingLabels: false,
        // ensure duplicates are shown when ticks are regular
        showDuplicates: true,
        rotate: 0,
        rotateAlways: false,
        offsetY: 20,
        // Always format the tick timestamp as "HH:00". `value` or `timestamp` may be used
        // depending on ApexCharts version; handle both.
        formatter: function(value: any, timestamp?: any) {
          // Compute label index based on minX and 3-hour interval so labels are fixed at
          // 00:00, 03:00, 06:00, ... regardless of actual tick timestamps.
          const threeHours = 3 * 60 * 60 * 1000;
          let ms: number;
          if (typeof timestamp === 'number') ms = timestamp;
          else if (typeof value === 'number') ms = value;
          else ms = Number(value);

          const idx = Math.round((ms - minX) / threeHours);
          const hh = ((idx * 3) % 24 + 24) % 24; // ensure positive
          return String(hh).padStart(2, '0') + ':00';
        },
        style: { colors: '#94a3b8', fontSize: '12px' }
      },
      // Force ticks every 3 hours. `tickInterval` guarantees tick placement for datetime axis.
      tickInterval: 3 * 60 * 60 * 1000, // 3 hours in ms
      // Use explicit tickAmount for a full day: 6 ticks (24/3)
      tickAmount: 8,
      tickPlacement: 'on',
      tooltip: { enabled: false }
    },
    // annotations removed — rely on native x-axis labels computed above
    yaxis: { labels: { style: { colors: '#94a3b8', fontSize: '12px' }, formatter: (v) => (Number(v) as number).toFixed(1) }, min: 0, max: 35, tickAmount: 7 },
    grid: { borderColor: '#334155', strokeDashArray: 0, yaxis: { lines: { show: true } }, xaxis: { lines: { show: false } }, padding: { top: 0, right: 0, bottom: 100, left: 10 } },
    legend: { show: true, position: 'top', horizontalAlign: 'right', offsetY: -20, itemMargin: { horizontal: 10, vertical: 0 }, labels: { colors: '#e2e8f0' } },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px' },
      x: { show: true },
      y: { formatter: (val) => (Number(val) as number).toFixed(1) },
      custom: function({ series, dataPointIndex }: any) {
        // dataPointIndex corresponds to index within the series data array
        const timeMs = baseMs + dataPointIndex * 60_000;
        const t = new Date(timeMs);
        const hh = String(t.getHours()).padStart(2, '0');
        const mm = String(t.getMinutes()).padStart(2, '0');
        const time = `${hh}:${mm}`;
        const valTemp = series[0][dataPointIndex];
        const valDO = series[1][dataPointIndex];
        const valPH = series[2][dataPointIndex];
        return `
          <div class="px-4 py-3 bg-slate-800 border border-slate-700 rounded shadow-lg text-slate-200">
            <div class="text-xs text-slate-400 mb-2 font-semibold">${time}</div>
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2 h-2 rounded-full bg-blue-300"></span>
              <span class="text-xs">Temp (C):</span>
              <span class="font-bold text-sm">${valTemp}</span>
            </div>
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2 h-2 rounded-full bg-blue-500"></span>
              <span class="text-xs">DO (mg/L):</span>
              <span class="font-bold text-sm">${valDO}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span class="text-xs">pH:</span>
              <span class="font-bold text-sm">${valPH}</span>
            </div>
          </div>
        `;
      }
    },
    markers: { size: 0, colors: ['#93C5FD', '#3B82F6', '#6366F1'], strokeColors: '#fff', strokeWidth: 2, hover: { size: 6 } }
  };

  return (
    <div className="w-full h-full min-h-[400px]">
      {typeof window !== 'undefined' && <Chart options={options} series={series} type="area" height={400} />}
    </div>
  );
};

export default WaterQualityChart;