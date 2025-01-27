import { Hono } from "hono";

import { dataScript } from "../../scripts/data.script";
import { createEmbedding } from "../../services/openai/openai.service";
import { queryPinecone } from "../../services/pinecone/pinecone.service";

const testRouter = new Hono();

testRouter.get("/", async (c) => {
  try {
    const embeddings = await createEmbedding("Name of the person mentioned in the resume");
    const queryResponse = await queryPinecone({
      promptVector: embeddings.data[0].embedding,
    });
    return c.json({ response: queryResponse });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default testRouter;
