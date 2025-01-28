import { index, pgTable, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

export const chat = pgTable('chat', {
    chatId: varchar('chatId', { length: 255 }).primaryKey(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
}, (chat) => {
    return {
        chatIdIdx: uniqueIndex("chatId_idx").on(chat.chatId),
    };
});

export const messages = pgTable('messages', {
    messageId: varchar('messageId', { length: 256 }).primaryKey(),
    chatId: varchar('chatId', { length: 256 }).notNull(),
    prompt: text('prompt').notNull(),
    response: text('response').notNull(),
    createdAt: timestamp('createdAt').defaultNow(),
    updatedAt: timestamp('updatedAt').defaultNow()
}, (messages) => {
    return {
        chatIdIdx: index("chatId_messages_idx").on(messages.chatId),
        messageIdIdx: uniqueIndex("messageId_idx").on(messages.messageId),
    };
});

