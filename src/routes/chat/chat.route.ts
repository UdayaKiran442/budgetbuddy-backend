import { Hono } from "hono";
import { z } from "zod";

const chatRouter = new Hono();

const GenerateChatResponseSchema = z.object({
    prompt: z.string().describe("The prompt to generate a chat response"),
});

export type IGenerateChatResponseSchema = z.infer<typeof GenerateChatResponseSchema>;

chatRouter.post("/generate", async (c) => {
    return c.json({ message: "Chat route" });
});

export default chatRouter;