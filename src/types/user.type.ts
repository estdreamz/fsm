export interface UserFind {
  code: string;
  email: string;
  full_name: string;
  id: number;
  org_code: string;
  org_id: number;
  org_name: string;
  photo: string | null;
  role_id: number;
  role_level: string;
  role_name: string;
  status: number;
  edit: boolean;
}

export interface UserObject {
  id: number;
  code: string | null;
  email: string;
  password: string;
  prefix_id: number | null;
  prefix_name: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  photo: string | null;
  mobile: string | null;
  addr: string | null;
  province_id: number | null;
  province_name: string | null;
  district_id: number | null;
  district_name: string | null;
  subdistrict_id: number | null;
  subdistrict_name: string | null;
  zip_code: string | null;
  role_id: number;
  role_level: string;
  role_name: string;
  org_id: number;
  org_code: string;
  org_name: string;
  status: number;
}

export interface ProfileItem {
  id: number;
  code: string | null;
  email: string;
  mobile: string | null;
  prefix_id: number | null;
  prefix_name: string | null;
  role_id: number | null;
  role_name: string | null;
  org_id: number | null;
  org_name: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  photo: string | null;
  addr: string | null;
  province_id: number | null;
  province_name: string | null;
  district_id: number | null;
  district_name: string | null;
  subdistrict_id: number | null;
  subdistrict_name: string | null;
  zip_code: string | null;
  status: number;
  last_login: string;
  created_name: string;
  created_at: string;
  updated_name: string;
  updated_at: string;
}
