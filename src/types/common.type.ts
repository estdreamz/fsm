import type React from "react";
import { LookupValue } from "./api.type";

export type SelectionItems = Iterable<{
  key: string;
  title: string;
  [key: string]: any;
}>;

enum Gender {
  Male = 1,
  Female = 2,
  Unspecified = 3, // ถ้าเป็น 3 ตอนส่ง param ให้เป็น null ไม่ระบุเพศ
}

export const genderOptions: LookupValue[] = [
  { label: "ชาย", value: Gender.Male },
  { label: "หญิง", value: Gender.Female },
  { label: "ไม่ระบุ", value: Gender.Unspecified },
];

type Paging = {
  page: number;
  perpage: number;
  total: number;
};

type ParamPaging = {
  perpage: number;
  page: number;
  sort_by: string;
  sort_type: string;
};

interface TableContent<T> {
  total: number;
  result: T[];
}

type TableHeaderProp = {
  key: string;
  title: string;
  width?: number | null;
  align?: "start" | "end" | "center";
}[];

type TableCallback<T> = {
  key: React.Key;
  cellValue: T[keyof T];
  value: T;
  index: number;
};

type Color = "primary" | "secondary" | "success" | "warning" | "danger" | "default" | undefined;




export type { TableContent, TableHeaderProp, Paging, TableCallback, ParamPaging, Color };
