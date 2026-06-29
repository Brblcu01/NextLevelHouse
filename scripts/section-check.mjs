import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await mkdir("qa", { recursive: true });
await page.goto("http://127.0.0.1:5173", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(700);

for (const [name, selector] of [
  ["benefits-section", ".benefits-section"],
  ["pricing-section", ".pricing-section"],
]) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: resolve("qa", `${name}.png`), fullPage: false });
}

await browser.close();
