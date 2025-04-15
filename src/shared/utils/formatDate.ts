// src/shared/utils/formatDate.ts

/**
 * 数値を指定された桁数になるようにゼロパディングするヘルパー関数
 * @param num パディングする数値
 * @param len 目標の桁数 (デフォルト: 2)
 * @returns ゼロパディングされた文字列
 */
const padZero = (num: number, len: number = 2): string => {
  return String(num).padStart(len, "0");
};

// JST (UTC+9) オフセット (ミリ秒)
const JST_OFFSET = 9 * 60 * 60 * 1000;

/**
 * Date オブジェクトを "YYYY/MM/DD(曜) HH:MM:SS.ms" 形式の JST 文字列にフォーマットします。
 * ミリ秒は上位2桁を表示します。
 * 実行環境のタイムゾーン設定に依存しません。
 * @param date フォーマットする Date オブジェクト
 * @returns JST でフォーマットされた日時文字列
 */
export function formatDate(date: Date): string {
  // 元のDateオブジェクトのUTCタイムスタンプにJSTオフセットを加算して、
  // JST相当の時刻を持つ新しいDateオブジェクトを作成します。
  const jstDate = new Date(date.getTime() + JST_OFFSET);

  // UTC系のメソッドを使用して、JST相当の年月日時分秒を取得します。
  // これにより、実行環境のタイムゾーン設定の影響を受けません。
  const year = jstDate.getUTCFullYear();
  const month = padZero(jstDate.getUTCMonth() + 1); // getUTCMonth() は 0 から始まるため +1
  const day = padZero(jstDate.getUTCDate());
  const hour = padZero(jstDate.getUTCHours());
  const minute = padZero(jstDate.getUTCMinutes());
  const second = padZero(jstDate.getUTCSeconds());
  // ミリ秒は3桁でパディングしてから上位2桁を取得します。
  const millisecond = padZero(jstDate.getUTCMilliseconds(), 3).substring(0, 2);

  // 曜日を取得するための配列 (0:日, 1:月, ..., 6:土)
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const dayOfWeekIndex = jstDate.getUTCDay(); // UTC系の曜日取得メソッドを使用

  // 指定されたフォーマットで文字列を組み立てて返します。
  return `${year}/${month}/${day}(${weekdays[dayOfWeekIndex]}) ${hour}:${minute}:${second}.${millisecond}`;
}