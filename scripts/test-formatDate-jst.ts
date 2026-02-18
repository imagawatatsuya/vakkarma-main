import { writeFileSync } from "node:fs";
import { formatDate } from "../src/shared/utils/formatDate";

const sourceDate = new Date("2025-01-01T00:00:00.123Z");

const ja = formatDate(sourceDate, { acceptLanguage: "ja-JP" });
const en = formatDate(sourceDate, { acceptLanguage: "en-US" });

if (ja !== "2025/01/01(水) 09:00:00.12") {
  throw new Error(`Expected ja-JP output to be JST 09:00:00.12, got: ${ja}`);
}

if (en !== "2025/01/01(Wed) 09:00:00.12") {
  throw new Error(`Expected en-US output to be JST with weekday Wed, got: ${en}`);
}

const html = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <title>JST Verification</title>
    <style>
      body { font-family: sans-serif; padding: 24px; }
      .ok { color: #0a7a0a; font-weight: bold; }
      code { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1>formatDate JST Verification</h1>
    <p>Input UTC: <code>${sourceDate.toISOString()}</code></p>
    <p>ja-JP: <code>${ja}</code></p>
    <p>en-US: <code>${en}</code></p>
    <p class="ok">PASS: Times are rendered in Asia/Tokyo (JST)</p>
  </body>
</html>`;

writeFileSync("artifacts/jst-verification.html", html);
console.log("PASS", { ja, en });
