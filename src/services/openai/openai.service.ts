import OpenAI from "openai";

import {
  CreateEmbeddingError,
  GenerateChatResponseError,
} from "../../exceptions/openai.exceptions";
import {
  CREATE_EMBEDDING_ERROR,
  GENERATE_CHAT_RESPONSE_ERROR,
} from "../../constants/error.constants";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function createEmbedding(text: string) {
  try {
    const embedding = await openai.embeddings.create({
      input: text,
      model: "text-embedding-3-small",
      dimensions: 1536,
    });
    return embedding;
  } catch (error) {
    throw new CreateEmbeddingError(
      CREATE_EMBEDDING_ERROR.message,
      CREATE_EMBEDDING_ERROR.errorCode,
      CREATE_EMBEDDING_ERROR.statusCode
    );
  }
}

export async function generateChatResponse(payload: {
  prompt: string;
  context: string;
}) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Provide a response to the user's prompt based on the context provided. Context is the user's resume. Prompt: ${payload.prompt} Context: ${payload.context}. Response: Without any explanation, provide a RFC8259 compliant JSON response following this format without deviation. {"response": ""}. Do not include any other text or explanation.`,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });
    console.log("🚀 ~ response:", response);
    const responseJSON = JSON.parse(response.choices[0].message.content);
    console.log("🚀 ~ responseJSON:", responseJSON);
    return responseJSON;
  } catch (error) {
    throw new GenerateChatResponseError(
      GENERATE_CHAT_RESPONSE_ERROR.message,
      GENERATE_CHAT_RESPONSE_ERROR.errorCode,
      GENERATE_CHAT_RESPONSE_ERROR.statusCode
    );
  }
}
