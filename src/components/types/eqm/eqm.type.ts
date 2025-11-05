export interface EqmResult {
  id: number;
  name: string;
  code: string;
  status: number;
  ready: number;
  borrowed: number;
  name_borrow: string | null;
  due_date: string | null;
  created_at: string;
  edit: boolean;
  source_type: number;
  source_extra: string;
  received_date: string;
  overdue?: any;
}

export interface EqmEdit {
  id: number;
  name: string;
  code: string;
  type_id: number;
  category_id: number;
  price: number;
  remark: string;
  ready: number;
  photo: string[];
  updated_by: string | null;
  updated_at: string;
  received_date: string;
  source_type: string | null;
  source_extra: string | null;
}
