import { Hono } from "hono";
import {
  scrapeDataFromPdfScript,
  scrapeDataFromPptxScript,
  scrapeDataFromUrlScript,
} from "../../scripts/data.script";

const testRouter = new Hono();

const data = [
  {
    url: "https://pib.gov.in/PressReleasePage.aspx?PRID=2097921",
    type: "url",
  },
  {
    filePath: "src/assets/Budget_2025-26/budget_glance.pdf",
    type: "pdf",
  },
  {
    filePath: "src/assets/Budget_2025-26/Budget_Speech.pdf",
    type: "pdf",
  },
  {
    filePath: "src/assets/Budget_2025-26/deficit_stats.pptx",
    type: "pptx",
  },
  {
    filePath: "src/assets/Budget_2025-26/expenditure.pptx",
    type: "pptx",
  },
  {
    filePath: "src/assets/Budget_2025-26/highlights.pptx",
    type: "pptx",
  },
  {
    filePath: "src/assets/Budget_2025-26/outcome.pptx",
    type: "pptx",
  },
  {
    filePath: "src/assets/Budget_2025-26/receipts.pdf",
    type: "pdf",
  },
  {
    filePath: "src/assets/Budget_2025-26/schemes.pdf",
    type: "pdf",
  },
];

testRouter.get("/", async (c) => {
  try {
    for (const item of data) {
      if (item.type === "url") {
        console.log(`Scraping data from ${item.url}`);
        const isDone = await scrapeDataFromUrlScript(item.url);
        if (isDone) {
          console.log(`Scraping data from ${item.url} is done`);
        } else {
          console.error(`Scraping data from ${item.url} is failed`);
        }
      } else if (item.type === "pdf") {
        console.log(`Scraping data from ${item.filePath}`);
        const isDone = await scrapeDataFromPdfScript(item.filePath);
        if (isDone) {
          console.log(`Scraping data from ${item.filePath} is done`);
        } else {
          console.error(`Scraping data from ${item.filePath} is failed`);
        }
      } else if (item.type === "pptx") {
        console.log(`Scraping data from ${item.filePath}`);
        const isDone = await scrapeDataFromPptxScript(item.filePath);
        if (isDone) {
          console.log(`Scraping data from ${item.filePath} is done`);
        } else {
          console.error(`Scraping data from ${item.filePath} is failed`);
        }
      }
    }
    return c.json({ response: "success" });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default testRouter;
