import { Hono } from "hono";
import { z } from "zod";

import { createChat, generateChatResponse, getChatMessages } from "../../contoller/chat.controller";
import { CreateChatError, CreateChatErrorInDb, GetChatMessagesError, GetChatMessagesFromDbError } from "../../exceptions/chat.exceptions";
import {
  GenerateChatResponseError,
  GenerateChatResponseFromOpenAIError,
} from "../../exceptions/openai.exceptions";

const chatRouter = new Hono();

const GenerateChatResponseSchema = z.object({
  chatId: z.string().describe("The chat id"),
  prompt: z.string().describe("The prompt to generate a chat response"),
});

export type IGenerateChatResponseSchema = z.infer<
  typeof GenerateChatResponseSchema
>;

chatRouter.post("/generate", async (c) => {
  try {
    const payload = await c.req.json();
    const response = await generateChatResponse(payload);
    return c.json(response);
  } catch (error) {
    if (
      error instanceof GenerateChatResponseError ||
      error instanceof GenerateChatResponseFromOpenAIError
    ) {
      return c.json({
        message: error.message,
        errorCode: error.errorCode,
        statusCode: error.statusCode,
      });
    }
  }
});

chatRouter.get("/create", async (c) => {
 try {
     const response = await createChat();
     return c.json(response);
 } catch (error) {
    if(error instanceof CreateChatErrorInDb || error instanceof CreateChatError){
        return c.json({
            message: error.message,
            errorCode: error.errorCode,
            statusCode: error.statusCode
        })
    }
 }
});

chatRouter.post("/messages", async (c) => {
  try {
    const payload = await c.req.json();
    const response = await getChatMessages(payload.chatId);
    return c.json(response);
  } catch (error) {
    if(error instanceof GetChatMessagesError || error instanceof GetChatMessagesFromDbError){
      return c.json(error.toObject());
    }
  }
})

export default chatRouter;
