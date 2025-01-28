import { eq } from "drizzle-orm";

import db from "../db";
import { chat, messages } from "../schema";
import { generateUuid } from "../../utils/generateUuid.utils";
import { CreateChatErrorInDb, GetChatMessagesFromDbError, InsertChatMessagesInDbError } from "../../exceptions/chat.exceptions";
import { CREATE_CHAT_IN_DB_ERROR, GET_CHAT_MESSAGES_FROM_DB_ERROR, INSERT_CHAT_MESSAGES_IN_DB_ERROR } from "../../constants/error.constants";

export async function createChatInDb() {
    try {
        const insertPayload = {
            chatId: `chat_${generateUuid()}`,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(chat).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new CreateChatErrorInDb(CREATE_CHAT_IN_DB_ERROR.message, CREATE_CHAT_IN_DB_ERROR.errorCode, CREATE_CHAT_IN_DB_ERROR.statusCode);
    }
}

export async function insertChatMessagesInDb(payload: {
    chatId: string,
    prompt: string,
    response: string
}) {
    try {
        const insertPayload = { 
            messageId: `message_${generateUuid()}`,
            chatId: payload.chatId,
            prompt: payload.prompt,
            response: payload.response,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await db.insert(messages).values(insertPayload);
        return insertPayload;
    } catch (error) {
        throw new InsertChatMessagesInDbError(INSERT_CHAT_MESSAGES_IN_DB_ERROR.message, INSERT_CHAT_MESSAGES_IN_DB_ERROR.errorCode, INSERT_CHAT_MESSAGES_IN_DB_ERROR.statusCode);
    }
}

export async function getChatMessagesFromDb(chatId: string){
    try {
        return await db.select().from(messages).where(eq(messages.chatId, chatId));
    } catch (error) {
        throw new GetChatMessagesFromDbError(GET_CHAT_MESSAGES_FROM_DB_ERROR.message, GET_CHAT_MESSAGES_FROM_DB_ERROR.errorCode, GET_CHAT_MESSAGES_FROM_DB_ERROR.statusCode);
    }
}