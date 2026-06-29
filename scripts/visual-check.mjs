import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "mobile", width: 390, height: 844 },
];

const url = "http://127.0.0.1:5173";
const qaDir = resolve("qa");
await mkdir(qaDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const results = [];

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(900);

  const metrics = await page.evaluate(() => {
    const root = document.documentElement;
    const overflowing = [...document.querySelectorAll("body *")]
      .map((node) => {
        const element = node;
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: element.className?.toString() ?? "",
          right: Math.round(rect.right),
          left: Math.round(rect.left),
        };
      })
      .filter((item) => item.right > window.innerWidth + 1 || item.left < -1)
      .slice(0, 8);

    const buttons = [...document.querySelectorAll("button, a.magnetic-button")].map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        text: (node.textContent ?? "").trim().replace(/\s+/g, " "),
        ok: node.scrollWidth <= Math.ceil(rect.width) + 2,
        width: Math.round(rect.width),
        scrollWidth: node.scrollWidth,
      };
    });

    return {
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      overflowX: root.scrollWidth > root.clientWidth,
      overflowing,
      clippedButtons: buttons.filter((item) => !item.ok).slice(0, 6),
      title: document.title,
      meta: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
    };
  });

  await page.screenshot({ path: resolve(qaDir, `${viewport.name}.png`), fullPage: false });
  results.push({ name: viewport.name, ...metrics });
}

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(url, { waitUntil: "domcontentloaded" });
await page.locator(".comparison-range").focus();
const sliderBefore = await page.locator(".comparison-range").inputValue();
await page.keyboard.press("ArrowRight");
const sliderAfter = await page.locator(".comparison-range").inputValue();

await page.getByRole("button", { name: /Quali fotografie/i }).click();
const faqExpanded = await page.getByRole("button", { name: /Quali fotografie/i }).getAttribute("aria-expanded");

await page.getByRole("button", { name: /Invia e richiedi/i }).click();
const invalidCount = await page.locator('[aria-invalid="true"]').count();
await page.getByLabel("Nome del tuo BNB / Struttura").fill("Casa Aurora");
await page.getByLabel("La tua Email").fill("host@example.com");
await page.getByLabel("Il tuo Recapito (Telefono/WhatsApp)").fill("+39 333 1234567");
await page.getByRole("button", { name: /Invia e richiedi/i }).click();
await page.getByText("Grazie! La tua richiesta è stata inviata.").waitFor({ timeout: 3000 });
const successVisible = await page.getByText("Grazie! La tua richiesta è stata inviata.").isVisible();

await browser.close();

console.log(
  JSON.stringify(
    {
      results,
      interactions: {
        sliderBefore,
        sliderAfter,
        sliderKeyboardChanged: sliderBefore !== sliderAfter,
        faqExpanded,
        invalidCount,
        successVisible,
      },
    },
    null,
    2,
  ),
);
