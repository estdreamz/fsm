export enum eqmStatus {
  available = 1,
  agency = 2,
  patient = 3,
}

export enum eqmStatusName {
  available = "ว่าง",
  agency = "หน่วยงาน",
  patient = "ผู้ป่วย",
}

export enum eqmReadyStatus {
  ready = 1,
  broken = 2,
  repair = 3,
  unusable = 4,
  lost = 5,
}

export enum eqmReadyStatusName {
  ready = "พร้อมใช้",
  broken = "ชำรุด",
  repair = "ส่งซ่อม",
  unusable = "จำหน่าย",
  lost = "สูญหาย",
}
