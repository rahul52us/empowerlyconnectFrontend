import moment from "moment";

export const SHORT_DATE_FORMAT: string = "MMM D, YYYY";
export const MEDIUM_DATE_FORMAT: string = "MMMM D, YYYY";
export const LONG_DATE_FORMAT: string = "dddd, MMMM D, YYYY";
export const DDMMYYYY_FORMAT: string = "DD/MM/YYYY";
export const YYYYMMDD_FORMAT: string = "YYYY/MM/DD";

export enum DateTimeOrder {
  DateFirst = "DateFirst",
  TimeFirst = "TimeFirst",
}

export const convertToReadableIST = (isoDate : string) => {
  if (!isoDate) {
    return null;
  }

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) {
    return null;
  }

  // Convert to IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is 5 hours and 30 minutes ahead of UTC
  const istDate = new Date(date.getTime() + istOffset);

  // Formatting the date and time in IST
  const formattedDate = istDate.toISOString().replace('T', ' ').split('.')[0];

  return formattedDate;
};

export function formatDate(date: Date, format?: string): string {
  return moment(date).format(format || DDMMYYYY_FORMAT);
}

export function manipulateDateWithMonth(date: Date, numberOfMonths: number, type: 'add' | 'sub'): string {
  const manipulatedDate = moment(date);
  if (type === 'add') {
    manipulatedDate.add(numberOfMonths, 'months');
  } else {
    manipulatedDate.subtract(numberOfMonths, 'months');
  }
  return manipulatedDate.format('YYYY-MM-DD');
}


// dateUtils.ts
export function formatDateTime(
  timestamp: string,
  format?: string,
  includeSeconds: boolean = true,
  dateTimeOrder?: DateTimeOrder,
): string {

  const momentDate = moment(timestamp);

  if (!momentDate.isValid()) {
    return '-';
  }

  const order = dateTimeOrder || DateTimeOrder.DateFirst;
  const dateFormat = format || DDMMYYYY_FORMAT;
  const timeFormat = includeSeconds ? 'h:mm:ss A' : 'h:mm A';

  const dateTimeFormat =
    order === DateTimeOrder.DateFirst
      ? `${dateFormat}, ${timeFormat}`
      : `${timeFormat}, ${dateFormat}`;

  const formattedDateTime = moment(timestamp).format(dateTimeFormat);
  return formattedDateTime;
}


export function getCustomTextDate(
  title: string,
  dateString: any,
  format?: string
) {
  try {
    const date = moment.utc(dateString);
    const formattedDate = date.format(format || SHORT_DATE_FORMAT);
    return `${title} ${formattedDate}`;
  } catch (_) {
    return ``;
  }
}

export const currentYear = new Date();
export const oneYearLater = new Date(
  currentYear.getFullYear() + 1,
  currentYear.getMonth(),
  currentYear.getDate()
);

const currentDates = moment();

export const currentYears = currentDates.format('YYYY');
export const currentMonth = currentDates.format('MM');
export const currentDateValue = currentDates.format('DD');