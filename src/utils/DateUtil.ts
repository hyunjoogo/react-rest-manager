import moment from 'moment';
import {DateType} from "../components/add-page";

interface DateFormat {
  (value?: Date | DateType | null, format?: string): string;
}

export const Format = {
  YYYY_MM_DD: 'YYYY-MM-DD',
  YY_MM_DD: 'YY-MM-DD',
  YYYY_MM_DD_HHmmss: 'YYYY-MM-DD HH:mm:ss',
  YYYY_MM_DD_HHmm: 'YYYY-MM-DD HH:mm',
  YYYY_MM: 'YYYY-MM',
  YYYYMMDD: "YYYYMMDD"
};

/**
 * @param value timestamp 형식 default 현재시간
 *
 * */



export const format: DateFormat = (value, format = Format.YYYYMMDD) => {
  if (value === null) {
    return "";
  }
  return moment(value).format(format);
};

export function whatDay(value: Date | string | undefined) {
  return moment(value).day();
}

export function prevMonth(value: Date | undefined) {
  return moment(value).subtract(1, 'months').toDate();
}

export function nextMonth(value: Date | undefined) {
  return moment(value).add(1, 'months').toDate();
}

export function toStartOfMonth(value: Date | undefined) {
  return moment(value).startOf('month').toDate();
}

export function toEndOfMonth(value: Date | undefined) {
  return moment(value).endOf('month').toDate();
}

export function toEndOfPrevMonth(value: Date | undefined) {
  return moment(value).subtract(1, 'months').endOf('month').toDate();
}

export function toStartOfNextMonth(value: Date | undefined) {
  return moment(value).add(1, 'months').startOf('month').toDate();
}


export function toEndOfTime(value: Date | undefined) {
  return moment(value).endOf('day').toDate();
}

export function toTimeStamp(value: Date | undefined) {
  return moment(value).toDate().getTime();
}

export function toStartOfTimeStamp(value: Date | undefined) {
  return moment(value).startOf('day').toDate().getTime();
}

export function toStartOfYearTimeStamp(value: Date | undefined) {
  return moment(value).startOf('year').toDate().getTime();
}

export function toEndOfYearTimeStamp(value: Date | undefined) {
  return moment(value).endOf('year').toDate().getTime();
}

//
// export function diff(startTimeStamp, endTimeStamp, unitOfTime) {
//   return Math.abs(moment(startTimeStamp).diff(moment(endTimeStamp), unitOfTime));
// }
//
// export function add(amount, unit) {
//   return moment().add(amount, unit).toDate().getTime();
// }
//
// export function now() {
//   return moment().toDate().getTime();
// }
//
// export function addValue(value, amount, unit) {
//   return moment(value).add(amount, unit).toDate().getTime();
// }

