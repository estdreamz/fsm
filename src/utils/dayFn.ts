import DJS from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/th";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import isLeapYear from "dayjs/plugin/isLeapYear";
import customParseFormat from "dayjs/plugin/customParseFormat";


const tz = process.env.TZ ?? "Asia/Bangkok";

DJS.extend(utc);
DJS.extend(timezone);
DJS.extend(buddhistEra);
DJS.extend(relativeTime);
DJS.extend(customParseFormat);
DJS.extend(isSameOrAfter);
DJS.extend(isSameOrBefore);
DJS.extend(isBetween);
DJS.extend(isLeapYear);
DJS.tz.setDefault(tz);
DJS.locale("th");

const dayjs = DJS;

export default dayjs;
