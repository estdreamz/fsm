import type { EqmReturnType } from "@/formSchema/eqm/borrow-org/addEditForm";
import type { DeliverType } from "@/formSchema/eqm/borrow-pt/borrowForm";

export interface PidResult {
  id: number;
  pid: string;
  fullname: string;
  mobile: string;
}

export interface PtBorrowItems {
  id: number;
  fullname: string;
  begin_date: string;
  end_date: string;
  status: number;
  status_name: string;
  created_at: string;
  return_date: string;
  edit: boolean;
}

export interface Eqm {
  id: number;
  code: string;
  name: string;
  before_photo: string[];
  after_photo: string[];
  status: number;
  remark: string | null;
}

export interface PtBorrow {
  id: number;
  status: number;
  deliver_type: DeliverType | null;
  deliver_name: string;
  deliver_mobile: string;
  return_type?: EqmReturnType | null;
  return_name?: string | null;
  return_mobile?: string | null;
  begin_date: string;
  end_date: string;
  is_cash: number;
  cash: number;
  remark: string;
  eqm: Eqm[];
  patient: PidResult;
}
