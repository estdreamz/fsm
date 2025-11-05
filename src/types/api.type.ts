// import { HttpStatusCode } from "axios";

interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
  status: "ok" | "error";
}

interface LookupValue {
  value: number;
  label: string;
}

interface MenuChildren {
  id: number;
  name: string;
  icon?: string | null;
  url: string;
  priority: number;
}

interface Menu {
  id: number;
  name: string;
  icon: string;
  url: string;
  priority: number;
  children: MenuChildren[];
}

interface Profile {
  id: number;
  code?: string | null;
  email: string;
  mobile?: string | null;
  prefix_id?: string | null;
  prefix_name?: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  photo: string | null;
  role_level: string;
  role_id: number;
  role_name: string;
  org_id?: string | null;
  org_name?: string | null;
  org_status?: string | null;
  status: number;
  last_login: string;
  menus: Menu[];
}

interface initTokenResponse {
  btext: string;
  expire: string;
  expiresIn: string;
  token: string;
  tokenType: string;
  type: string;
}

interface AppCookie {
  keyId: string;
  dynamicKey: string;
  pk: string;
  token: string;
  auth: boolean;
  role: string;
}

interface UserCredential {
  type: string;
  token: string;
  btext: string;
  tokenType: string;
  expire: string;
  expiresIn: string;
  profile: Profile;
}

interface FileStream {
  buffer: ArrayBuffer;
  filename: string;
}

interface TableModel<T> {
  result: T[];
  total: number;
}

interface Paging {
  page: number;
  perpage: number;
}

export type {
  ApiResponse,
  initTokenResponse,
  AppCookie,
  UserCredential,
  Profile,
  Menu,
  MenuChildren,
  LookupValue,
  FileStream,
  TableModel,
  Paging,
};
