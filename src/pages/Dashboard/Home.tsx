import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import WaterQualityChart from "../../components/ecommerce/StatisticsChart";
import { fetchWaterQuality } from "../../services/mockApi";
import { fetchEcommerceMetrics, type EcommerceMetricsData } from "../../services/mockApi";
import type { WaterQualityDataPoint } from "../../components/types/types";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<WaterQualityDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<EcommerceMetricsData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10); // yyyy-mm-dd
  });

  useEffect(() => {
    let mounted = true;
    const today = new Date();
    Promise.all([fetchWaterQuality(today), fetchEcommerceMetrics(today)])
      .then(([d, m]) => {
        if (!mounted) return;
        setData(d);
        setMetrics(m);
      })
      .then((d) => {
        // handled above
      })
      .catch(() => {
        if (!mounted) return;
        setData([]);
        setMetrics(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const dateObj = new Date(selectedDate + 'T00:00:00');
      const [res, m] = await Promise.all([fetchWaterQuality(dateObj), fetchEcommerceMetrics(dateObj)]);
      setData(res);
      setMetrics(m);
    } catch (e) {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="FMS.ZONE"
        description="This is Farm Management System Flatform"
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
            className="px-3 py-2 rounded bg-slate-800 text-slate-200 border border-slate-700"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-500"
          >
            ค้นหา
          </button>
          {loading && <div className="text-sm text-slate-400">Loading chart data…</div>}
        </div>
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <EcommerceMetrics data={metrics} />

          <WaterQualityChart data={data} />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlySalesChart />
        </div>

        <div className="col-span-12">
          <MonthlyTarget />
        </div>

        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
