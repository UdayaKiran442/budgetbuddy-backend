import OpenAI from "openai";

import {
  CreateEmbeddingError,
  GenerateChatResponseFromOpenAIError,
} from "../../exceptions/openai.exceptions";
import {
  CREATE_EMBEDDING_ERROR,
  GENERATE_CHAT_RESPONSE_FROM_OPENAI_ERROR,
} from "../../constants/error.constants";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Create embeddings for the text
export async function createEmbedding(text: string) {
  try {
    // Create embeddings for the text
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

// Generate chat response from OpenAI
export async function generateChatResponseFromOpenAI(payload: {
  prompt: string;
  context: string;
}) {
  try {
    // Generate chat response from OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Provide a **detailed response** to the user's prompt based on the context provided. Context is the detailed financial budget of Bharat. Also provide a response if the user's prompt is not related to the context. Prompt: ${payload.prompt} Context: ${payload.context}. Response: Without any explanation, provide a RFC8259 compliant JSON response following this format without deviation. {"response": ""}. Do not include any other text or explanation.`,
        },
      ],
      // Set the temperature to 0 to make the response more deterministic
      temperature: 0,
      response_format: {
        type: "json_object",
      },
    });
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    throw new GenerateChatResponseFromOpenAIError(
      GENERATE_CHAT_RESPONSE_FROM_OPENAI_ERROR.message,
      GENERATE_CHAT_RESPONSE_FROM_OPENAI_ERROR.errorCode,
      GENERATE_CHAT_RESPONSE_FROM_OPENAI_ERROR.statusCode
    );
  }
}
