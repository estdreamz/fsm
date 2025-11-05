export interface TransferFind {
  id: number;
  transfer_date: string;
  target_org_name: string;
  created_at: string;
  detail: string;
}

export interface TransferItem {
  eqm_id: number[];
  target_org_id: number | null;
  id: number;
  refNo: string;
  remark: string;
  transfer_date: string;
  target_org_name: string;
  created_at: string;
  recipientName: string;
  recipientMobile: string;
  children: Child[];
}

interface Child {
  eqm_id: number;
  code: string;
  name: string;
  photo: string[];
}
