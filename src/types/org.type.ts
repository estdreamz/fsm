export interface OrgFind {
  key: string;
  id: number;
  code: string;
  name: string;
  status: number;
  edit: boolean
}

export type OrgItem = {
  id: number | null;
  code: string | null;
  name: string | null;
  addr: string | null;
  province_id: number | null;
  province_name:string | null;
  district_id: number | null;
  district_name:string | null;
  subdistrict_id: number | null;
  subdistrict_name:string | null;
  status: number | null;
  tel: string | null;
  zip_code: string | null
};
