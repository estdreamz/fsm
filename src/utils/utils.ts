import type React from "react";
import dayjs from "../utils/dayFn";
import { Cryp } from "./secure";
import { DateType } from "../enum/master";
import { CalendarDate, parseDate, type DateValue } from "@internationalized/date";

class Utils {
  private static timer: ReturnType<typeof setTimeout>;

  private static regex = {
    numberic: /^[0-9\b]+$/,
  };

  private static toDate(date: DateValue) {
    const dateStr = date.toString();

    return dayjs(dateStr, DateType.isoShort).toDate();
  }

  private static toDayjs(date: DateValue) {
    const dateStr = date.toString();

    return dayjs(dateStr, DateType.isoShort);
  }

  private static toString(date: DateValue, format?: DateType) {
    const dateStr = date.toString();
    if (format && format === DateType.iso) {
      if (format === DateType.iso) return dayjs(dateStr, DateType.isoShort).toISOString();
      return dayjs(dateStr, DateType.isoShort).format(format);
    }
    return dayjs(dateStr, DateType.isoShort).format(DateType.isoStringTz);
  }

  private static toCalendar(date: string) {
    const dateStr = dayjs(date, [DateType.isoStringTz, DateType.isoString, DateType.isoShort]).format(
      DateType.isoShort,
    );

    return parseDate(dateStr);
  }

  public static formatDate = {
    toDate: (date: DateValue) => this.toDate(date),
    toDayjs: (date: DateValue) => this.toDayjs(date),
    toString: (date: DateValue, format?: DateType) => this.toString(date, format),
    toCalendar: (date: string) => this.toCalendar(date),
    // eslint-disable-next-line arrow-body-style
    view: (date: string, format: string = DateType.view) => {
      return dayjs(date, [DateType.isoComplete, DateType.isoString, DateType.isoStringTz]).format(format);
    },
  };

  private static toPhoneView(phone: string) {
    const cleaned = `${phone}`.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return phone;
  }

  private static toPidView(id: string) {
    const cleaned = `${id}`.replace(/\D/g, "");
    const match = cleaned.match(/(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}-${match[4]}-${match[5]}`;
    }

    return id;
  }

  private static age(birthday: string) {
    const bdc = this.toCalendar(birthday);
    const bdm = this.toDayjs(bdc);

    const today = dayjs();

    const y = today.diff(bdm, "years");

    bdm.add(y, "years");

    const m = today.diff(bdm, "months");

    bdm.add(m, "months");

    const d = today.diff(bdm, "days");

    return `${y} ปี ${m} เดือน ${d} วัน`;
  }

  private static time(t: string, format: string) {
    const tm = dayjs(t, format).format(DateType.timeView);

    return tm;
  }

  private static date(d: string, format: string) {
    const dm = dayjs(d, format).format(DateType.dateTimeBuddhist);

    return dm;
  }

  public static view = {
    phone: (phoneNumber: string) => this.toPhoneView(phoneNumber),
    pid: (id: string) => this.toPidView(id),
    age: (birthday: string) => this.age(birthday),
    time: (time: string, format = DateType.timeTz) => this.time(time, format),
    date: (date: string, format = DateType.isoString) => this.date(date, format),
  };

  public static onChangeInput = {
    numberic: (e: React.KeyboardEvent<HTMLInputElement>) => {
      const allowCode = ["ArrowRight", "Backspace", "ArrowLeft", "Delete", "MetaLeft", "MetaRight"];
      if (!this.regex.numberic.test(e.key) && !allowCode.includes(e.code)) {
        e.preventDefault();
      }
    },
  };

  public static enCvUrlParam(val: { [key: string]: any }) {
    const txt = JSON.stringify(val);
    const b64 = Buffer.from(txt).toString("base64");
    const data = encodeURIComponent(Cryp.n().encrypt(b64));

    return data;
  }

  public static deCvUrlParam<T>(val: string): T {
    const data = Buffer.from(Cryp.n().decryptTxt(decodeURIComponent(val)), "base64").toString("utf8");

    return JSON.parse(data) as T;
  }

  public static Debounce = <F extends (..._args: any[]) => void>(
    func: F,
    ms = 800,
    // eslint-disable-next-line arrow-body-style
  ) => {
    return (...args: Parameters<F>) => {
      if (this.timer) clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        func(...args);
      }, ms);
    };
  };

  public static debounce = <T>(func: (_query: any) => Promise<T>, ms = 800) => {
    let timeout: NodeJS.Timeout | null = null;
    let previousResolve: ((_value: T) => void) | null = null;

    return function dbc(query: any): Promise<T> {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise<T>(async (resolve) => {
        // Invoke resolve from previous call and keep the current resolve
        if (previousResolve) {
          const response = await func(query);
          previousResolve(response);
        }
        previousResolve = resolve;

        // Extending timeout
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }

        timeout = setTimeout(async () => {
          const response = await func(query);
          previousResolve!(response);
          timeout = null;
        }, ms);
      });
    };
  };

  public static audio = {
    asInterleaved(ab: AudioBuffer): Float32Array {
      const channels = ab.numberOfChannels;
      const output = new Float32Array(channels * ab.length);
      for (let i = 0; i < ab.length; i++) {
        for (let c = 0; c < channels; c++) {
          const chan = ab.getChannelData(c);
          output[i * channels + c] = chan[i];
        }
      }
      return output;
    },
    asPlanar(buffer: Float32Array, sampleRate: number, channels: number = 2): AudioBuffer {
      const channelLength = Math.floor(buffer.length / channels);
      const output = new AudioBuffer({
        numberOfChannels: channels,
        length: channelLength,
        sampleRate,
      });

      for (let c = 0; c < channels; c++) {
        const chan = output.getChannelData(c);
        for (let i = 0; i < channelLength; i++) {
          chan[i] = buffer[i * channels + c];
        }
      }

      return output;
    },
  };

  public static Url2File = (blobUrl: string, fileName?: string): Promise<File> =>
    new Promise((resolve) => {
      fetch(blobUrl).then((res) => {
        res.blob().then((blob) => {
          const nameExec = /[^(/|\\)]*$/.exec(blobUrl);
          const name = nameExec ? nameExec[0] : "";
          const file = new File([blob], fileName ? `${fileName}|${name}` : name, { type: blob.type });
          resolve(file);
        });
      });
    });

  public static openUrl(url: string, newtab = true) {
    if (url && document) {
      const link = document.createElement("a");
      link.href = url;
      if (newtab) link.target = "_blank";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  public static toCalendarDate = (value: string) => {
    try {
      if (!value) return null;

      const day = dayjs(value).format("YYYY-MM-DD");
      const date = parseDate(day);
      return date;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public static toDateString = (value: CalendarDate | DateValue | null) => {
    if (!value) return "";

    const date = value.toString();
    const result = dayjs(date).toISOString();
    if (!dayjs(result).isValid() || result === "Invalid Date") {
      return "";
    }

    return result;
  };
}

export default Utils;
