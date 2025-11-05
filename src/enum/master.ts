export enum ResponseType {
  arraybuffer = "arraybuffer",
  blob = "blob",
  document = "document",
  json = "json",
  text = "text",
  stream = "stream",
  formdata = "formdata",
}

export enum imageUploadType {
  user = 1,
  eqm = 2,
  repair = 3,
  move = 4,
}

export enum DateType {
  iso = "iso",
  isoComplete = "YYYY-MM-DDTHH:mm:ss.SSSZ",
  isoStringTz = "YYYY-MM-DDTHH:mm:ssZ",
  isoString = "YYYY-MM-DDTHH:mm:ss",
  isoShort = "YYYY-MM-DD",
  view = "DD/MM/BBBB - HH:mm [น.]",
  viewShort = "DD/MM/BBBB",
  dateTimeBuddhist = "DD/MM/BBBB - HH:mm:ss",
  timeView = "HH:mm [น.]",
  timeTz = "HH:mm:ssZ",
}
