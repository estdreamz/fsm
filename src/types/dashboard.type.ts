export interface SearchResult {
  qty: Qty;
  eqm_ready: TargetResult;
  borrow: Qty;
  borrow_graph: Borrowgraph;
  target_group: TargetResult;
  eqm_eqmtype: SeriesResult;
  borrow_target: SeriesResult;
}

export interface Borrowgraph {
  labels: string[];
  series: Series[];
}

export interface Series {
  label: string;
  borderColor: string;
  data: number[];
}

export interface Qty {
  labels: string[];
  colors: string[];
  series: number[];
}

export interface EqmTypeResult {
  result: EqmTypeEqm[];
  total: string;
}

export interface EqmTypeEqm {
  name: string;
  data: string;
}

export interface TargetResult {
  result: TargetEqm[];
  total: string;
}

export interface TargetEqm {
  name: string;
  data: string;
  color: string;
}

export interface SeriesResult {
  result: SeriesData[];
  total: string;
}

export interface SeriesData {
  name: string;
  data: string;
  color: string;
}
