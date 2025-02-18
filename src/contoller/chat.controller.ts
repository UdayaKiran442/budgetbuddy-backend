import { createEmbedding, generateChatResponseFromOpenAI } from "../services/openai/openai.service";
import { queryPinecone } from "../services/pinecone/pinecone.service";
import { createChatInDb, getChatMessagesFromDb, insertChatMessagesInDb } from "../repository/chat/chat.repository";
import { CREATE_CHAT_ERROR, GENERATE_CHAT_RESPONSE_ERROR, GET_CHAT_MESSAGES_ERROR } from "../constants/error.constants";
import { CreateChatError, CreateChatErrorInDb, GetChatMessagesError, GetChatMessagesFromDbError } from "../exceptions/chat.exceptions";
import { GenerateChatResponseError, GenerateChatResponseFromOpenAIError } from "../exceptions/openai.exceptions";
import { IGenerateChatResponseSchema } from "../routes/chat/chat.route";
import { cleanExtractedText } from "../utils/cleanText.utils";

export async function generateChatResponse(payload: IGenerateChatResponseSchema) {
    try {
        // Create embeddings for the prompt
        const embeddings = await createEmbedding(payload.prompt);
        // Query Pinecone for relevant responses
        const queryResponse = await queryPinecone({
            promptVector: embeddings.data[0].embedding,
        })
        // Extract context from the query response
        let context = '';
        for (const item of queryResponse.matches) {
            context += item.metadata.text;
        }
        // Util function  to clean the extracted text
        context = cleanExtractedText(context);
        // Generate chat response from OpenAI
        const response = await generateChatResponseFromOpenAI({
            context,
            prompt: payload.prompt
        })
        // Insert chat messages in the database
        await insertChatMessagesInDb({
            chatId: payload.chatId,
            prompt: payload.prompt,
            response: response.response
        })
        // Return the response
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

// Create a new chat
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

// Get chat messages from the database
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