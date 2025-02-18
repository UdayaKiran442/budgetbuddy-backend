// Create chat error
export class CreateChatError extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.errorCode = errorCode || 'OPENAI_102';
    }

    toObject(): object {
        const obj = {} as any;
        obj.message = this.message;
        return obj;
    }
}

// Insert chat messages in db error
export class InsertChatMessagesInDbError extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.errorCode = errorCode || 'CHAT_101';
    }

    toObject(): object {
        const obj = {} as any;
        obj.message = this.message;
        return obj;
    }
}

// Create chat error in db
export class CreateChatErrorInDb extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.errorCode = errorCode || 'CHAT_101';
    }

    toObject(): object {
        const obj = {} as any;
        obj.message = this.message;
        return obj;
    }
}

// Get chat messages from db error
export class GetChatMessagesFromDbError extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.errorCode = errorCode || 'CHAT_101';
    }

    toObject(): object {
        const obj = {} as any;
        obj.message = this.message;
        return obj;
    }
}

// Get chat messages error
export class GetChatMessagesError extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.errorCode = errorCode || 'CHAT_101';
    }

    toObject(): object {
        const obj = {} as any;
        obj.message = this.message;
        return obj;
    }
}
