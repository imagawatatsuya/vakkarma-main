const padZero = (num: number, len: number = 2): string => {
  return String(num).padStart(len, "0");
};

type FormatDateOptions = {
  acceptLanguage?: string;
};

const TOKYO_TIMEZONE = "Asia/Tokyo";

// 日時の形式を整えて文字列にする関数
export function formatDate(date: Date, options?: FormatDateOptions): string {
  // 2025/02/23(日) 08:41:28.90 など
  const locale = options?.acceptLanguage ?? "ja-JP";
  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone: TOKYO_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes): string => {
    return parts.find((part) => part.type === type)?.value ?? "";
  };

  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const weekday = getPart("weekday");
  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  const millisecond = padZero(date.getMilliseconds(), 3); //3桁

  return `${year}/${month}/${day}(${weekday}) ${hour}:${minute}:${second}.${millisecond.substring(0, 2)}`; //ミリ秒も最初から二桁で表示
}
