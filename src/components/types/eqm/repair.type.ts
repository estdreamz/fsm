
export type RepairParamSave = {
  id: number | null;
  ref_no: string;
  status: number | null
  send_date: string;
  remark: string;
  eqm_id: Eqmid[];
}
export interface Eqmid {
  eqm_id: number;
  before_photo: string[];
  after_photo: string[];
  remark: string;
  id?: number | null;
}

export interface RepairFind {
  id: number;
  ref_no: string;
  send_date: string;
  status: number;
  created_at: string;
  edit: boolean
}

export interface RepairItem {
  id: number;
  ref_no: string;
  remark: string;
  send_date: string;
  receive_date: string | null;
  created_at: string;
  children: Child[];
}

interface Child {
  eqm_id: number;
  code: string;
  name: string;
  before_photo: string[];
  after_photo?: string[] | null;
  remark: string;
  id: number;
}