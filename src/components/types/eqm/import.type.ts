export interface EqmImportFind {
  id: number;
  file_url: string;
  file_name: string;
  created_at: string;
  status: number;
}

export interface EqmImportItem {
  id: number;
  ref_no: string;
  inv_no: string;
  received_date: string;
  source_type: number;
  source_extra: string;
  file_name: string;
  file_url: string;
  status: number;
  children: EqmImportChildren[];
}
export interface EqmImportChildren {
  id: number;
  seq: number;
  name: string;
  code: string;
  type_name: string;
  category_name: string;
  price: string;
  remark: string;
  status: number;
  validate: any[];
}