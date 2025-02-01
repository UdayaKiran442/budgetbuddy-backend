import { Hono } from "hono";

import { dataScript, scrapeData } from "../../scripts/data.script";
import { createEmbedding } from "../../services/openai/openai.service";
import { queryPinecone } from "../../services/pinecone/pinecone.service";

const testRouter = new Hono();

testRouter.get("/", async (c) => {
  try {
    const docs = await scrapeData("https://pib.gov.in/PressReleasePage.aspx?PRID=2097921")
    return c.json({ response: docs });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default testRouter;
