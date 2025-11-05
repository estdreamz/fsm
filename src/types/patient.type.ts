export interface Patient {
  id: number;
  pid: string;
  mobile: string;
  full_name: string;
  status: number;
}

export interface PatientResult {
  total: number;
  result: Patient[];
}

export interface Org {
  patient_id: number;
  org_id: number;
  name: string;
  mobile: string;
  prefix_id: number;
  prefix_name: string;
  first_name: string;
  last_name: string;
  full_name: string;
  updated_by: string;
  updated_at: string;
}
export interface Caretaker {
  relation_id: number | null;
  relation_name: string;
  patient_id: number | null;
  mobile: string;
  prefix_id: number | null;
  prefix_name: string;
  first_name: string;
  last_name: string;
  full_name: string;
  addr: string;
  province_id: number | null;
  province_name: string;
  district_id: number | null;
  district_name: string;
  subdistrict_id: number | null;
  subdistrict_name: string;
  zip_code: string;
  updated_by: string;
  updated_at: string;
}

export interface PatientTargetGroup {
  key: string;
  title: string;
}

export interface PatientInfo {
  id: number;
  pid: string;
  mobile: string;
  email: string;
  prefix_id: number;
  prefix_name: string;
  first_name: string;
  last_name: string;
  full_name: string;
  gender: number;
  addr: string;
  province_id: number;
  province_name: string;
  district_id: number;
  district_name: string;
  subdistrict_id: number;
  subdistrict_name: string;
  zip_code: string;
  status: number;
  cancel_note: string;
  target_group: number[];
  caretaker: Caretaker;
  org: Org;
  updated_by: string;
  updated_at: string;
}

export interface PatientSave {
  id: number | null;
  pid: string;
  mobile: string;
  email: string;
  prefix_id: number | null;
  first_name: string;
  last_name: string;
  gender: number | null;
  addr: string;
  province_id: number | null;
  district_id: number | null;
  subdistrict_id: number | null;
  zip_code: string;
  status: number | null;
}

// export interface PatientImportResponse {
//   total: number;
//   result: PatientImportContent[];
// }

// export interface PatientImportContent {
//   id: number;
//   file_url: string;
//   file_name: string;
//   status: number;
//   created_at: string,
// }

export interface PatientImportResponse {
  id: number;
  file_name: string;
  file_url: string;
  status: number;
  created_at: string;
  children: PatientImportChild[];
  total: number;
  result: PatientImportResponse[];
}

export interface StatusLookup {
  value: number;
  label: string;
}

export interface PatientImportChild {
  id: number;
  seq: number;
  pid: string;
  prefix: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  mobile: string;
  addr: string;
  province: string;
  district: string;
  subdistrict: string;
  zip_code: string;
  status: number;
  validate: string[];
  key: string;
}

// export interface PatientImportResponse {
//   id: number;
//   file_name: string;
//   file_url: string;
//   status: number;
//   children: PatientImportChild[];
// }
