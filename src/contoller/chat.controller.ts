import { CREATE_CHAT_ERROR, GENERATE_CHAT_RESPONSE_ERROR } from "../constants/error.constants";
import { CreateChatError, CreateChatErrorInDb } from "../exceptions/chat.exceptions";
import { GenerateChatResponseError, GenerateChatResponseFromOpenAIError } from "../exceptions/openai.exceptions";
import { createChatInDb } from "../repository/chat/chat.repository";
import { IGenerateChatResponseSchema } from "../routes/chat/chat.route";
import { createEmbedding, generateChatResponseFromOpenAI } from "../services/openai/openai.service";
import { queryPinecone } from "../services/pinecone/pinecone.service";

export async function generateChatResponse(payload: IGenerateChatResponseSchema) {
    try {
        const embeddings = await createEmbedding(payload.prompt);
        const queryResponse = await queryPinecone({
            promptVector: embeddings.data[0].embedding,
        })
        console.log("🚀 ~ generateChatResponse ~ queryResponse:", queryResponse)
        let context = '';
        for (const item of queryResponse.matches) {
            context += item.metadata.text;
        }
        console.log("🚀 ~ generateChatResponse ~ context:", context)
        const response = await generateChatResponseFromOpenAI({
            context,
            prompt: payload.prompt
        })
        console.log("🚀 ~ generateChatResponse ~ response:", response)
        return response;
    } catch (error) {
        if(error instanceof GenerateChatResponseFromOpenAIError){
            throw error
        }
        throw new GenerateChatResponseError(
            GENERATE_CHAT_RESPONSE_ERROR.message,
            GENERATE_CHAT_RESPONSE_ERROR.errorCode,
            GENERATE_CHAT_RESPONSE_ERROR.statusCode
        )
    }
}

export async function createChat() {
    try {
        return await createChatInDb();
    } catch (error) {
        if(error instanceof CreateChatErrorInDb){
            throw error
        }
        throw new CreateChatError(
            CREATE_CHAT_ERROR.message,
            CREATE_CHAT_ERROR.errorCode,
            CREATE_CHAT_ERROR.statusCode
        )
    }
}