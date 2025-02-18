
// Create embedding error
export class CreateEmbeddingError extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.errorCode = errorCode || 'OPENAI_101';
    }

    toObject(): object {
        const obj = {} as any;
        obj.message = this.message;
        return obj;
    }
}

// Generate chat response error
export class GenerateChatResponseError extends Error {
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

// Generate chat response from OpenAI error
export class GenerateChatResponseFromOpenAIError extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.errorCode = errorCode || 'OPENAI_103';
    }

    toObject(): object {
        const obj = {} as any;
        obj.message = this.message;
        return obj;
    }
}