export interface ReportTable {
  id: number;
  name: string;
  code: string;
  status: number;
  ready: number;
  borrowed: number;
  due_date: string | null;
  overdue: boolean | null;
  created_at: string;
}

export interface ReportGraph {
  qty: Qty;
  borrow: Qty;
}

export interface Qty {
  labels: string[];
  colors: string[];
  series: number[];
}
