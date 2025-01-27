export class InsertVectorToPineconeError extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.errorCode = errorCode || 'IB101';
    }

    toObject(): object {
        const obj = {} as any;
        obj.message = this.message;
        return obj;
    }
}

export class FetchRelevantResponseFromPineconeError extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, errorCode?: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode || 500;
        this.errorCode = errorCode || 'IB102';
    }

    toObject(): object {
        const obj = {} as any;
        obj.message = this.message;
        return obj;
    }
}