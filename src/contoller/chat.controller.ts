import { createEmbedding, generateChatResponseFromOpenAI } from "../services/openai/openai.service";
import { queryPinecone } from "../services/pinecone/pinecone.service";
import { createChatInDb, getChatMessagesFromDb } from "../repository/chat/chat.repository";
import { CREATE_CHAT_ERROR, GENERATE_CHAT_RESPONSE_ERROR, GET_CHAT_MESSAGES_ERROR } from "../constants/error.constants";
import { CreateChatError, CreateChatErrorInDb, GetChatMessagesError, GetChatMessagesFromDbError } from "../exceptions/chat.exceptions";
import { GenerateChatResponseError, GenerateChatResponseFromOpenAIError } from "../exceptions/openai.exceptions";
import { IGenerateChatResponseSchema } from "../routes/chat/chat.route";

export async function generateChatResponse(payload: IGenerateChatResponseSchema) {
    try {
        const embeddings = await createEmbedding(payload.prompt);
        const queryResponse = await queryPinecone({
            promptVector: embeddings.data[0].embedding,
        })
        let context = '';
        for (const item of queryResponse.matches) {
            context += item.metadata.text;
        }
        const response = await generateChatResponseFromOpenAI({
            context,
            prompt: payload.prompt
        })
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

export async function getChatMessages(chatId: string){
    try {
        return await getChatMessagesFromDb(chatId);
    } catch (error) {
        if(error instanceof GetChatMessagesFromDbError){
            throw error
        }
       throw new GetChatMessagesError(
        GET_CHAT_MESSAGES_ERROR.message,
        GET_CHAT_MESSAGES_ERROR.errorCode,
        GET_CHAT_MESSAGES_ERROR.statusCode
       )    
    }
}