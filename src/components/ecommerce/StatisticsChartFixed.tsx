import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { WaterQualityDataPoint } from '../../components/types/types';

interface WaterQualityChartProps {
  data: WaterQualityDataPoint[];
}

const WaterQualityChartFixed: React.FC<WaterQualityChartProps> = ({ data }) => {
  const series = useMemo(() => [
    { name: 'Temp (C)', data: data.map(d => d.temp), color: '#93C5FD' },
    { name: 'DO (mg/L)', data: data.map(d => d.do), color: '#3B82F6' },
    { name: 'pH', data: data.map(d => d.ph), color: '#6366F1' }
  ], [data]);

  const categories = useMemo(() => data.map(d => d.time), [data]);

  const options: ApexOptions = {
    chart: { type: 'area', height: 350, fontFamily: 'Sarabun, Inter, sans-serif', background: 'transparent', toolbar: { show: false }, animations: { enabled: true, speed: 800 } },
    theme: { mode: 'dark' },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05, stops: [0, 90, 100] } },
    xaxis: {
        categories,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          show: true,
          style: { colors: '#94a3b8', fontSize: '12px' },
          // Parse the category string `HH:MM` and show only when minutes === '00' and hour % 3 === 0
          formatter: (value: any) => {
            try {
              const s = String(value);
              const parts = s.split(':');
              if (parts.length === 2) {
                const hh = parseInt(parts[0], 10);
                const mm = parts[1];
                if (mm === '00' && hh % 3 === 0) return s;
              }
            } catch (e) {
              // ignore
            }
            return '';
          }
        },
        tickAmount: 8,
        tickPlacement: 'on',
        tooltip: { enabled: false }
    },
    yaxis: { labels: { style: { colors: '#94a3b8', fontSize: '12px' }, formatter: (v) => (Number(v) as number).toFixed(1) }, min: 0, max: 35, tickAmount: 7 },
    grid: { borderColor: '#334155', strokeDashArray: 0, yaxis: { lines: { show: true } }, xaxis: { lines: { show: false } }, padding: { top: 0, right: 0, bottom: 0, left: 10 } },
    legend: { show: true, position: 'top', horizontalAlign: 'right', offsetY: -20, itemMargin: { horizontal: 10, vertical: 0 }, labels: { colors: '#e2e8f0' } },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px' },
      x: { show: true },
      y: { formatter: (val) => (Number(val) as number).toFixed(1) },
      custom: function({ series, dataPointIndex, w }) {
        const time = w.globals.labels[dataPointIndex];
        const valTemp = series[0][dataPointIndex];
        const valDO = series[1][dataPointIndex];
        const valPH = series[2][dataPointIndex];
        return `\n          <div class="px-4 py-3 bg-slate-800 border border-slate-700 rounded shadow-lg text-slate-200">\n            <div class="text-xs text-slate-400 mb-2 font-semibold">${time}</div>\n            <div class="flex items-center gap-2 mb-1">\n              <span class="w-2 h-2 rounded-full bg-blue-300"></span>\n              <span class="text-xs">Temp (C):</span>\n              <span class="font-bold text-sm">${valTemp}</span>\n            </div>\n            <div class="flex items-center gap-2 mb-1">\n              <span class="w-2 h-2 rounded-full bg-blue-500"></span>\n              <span class="text-xs">DO (mg/L):</span>\n              <span class="font-bold text-sm">${valDO}</span>\n            </div>\n            <div class="flex items-center gap-2">\n              <span class="w-2 h-2 rounded-full bg-indigo-500"></span>\n              <span class="text-xs">pH:</span>\n              <span class="font-bold text-sm">${valPH}</span>\n            </div>\n          </div>\n        `;
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

export default WaterQualityChartFixed;
