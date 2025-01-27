// pinecone service errors
export const INSERT_VECTOR_TO_PINECONE_ERROR = { message: 'Error inserting vector to pinecone', errorCode: 'PINECONE_101', statusCode: 500 };
export const FETCH_RELEVANT_RESPONSE_FROM_PINECONE_ERROR = { message: 'Error fetching relevant response from pinecone', errorCode: 'PINECONE_102', statusCode: 500 };

// openai service errors
export const CREATE_EMBEDDING_ERROR = { message: 'Error creating embedding', errorCode: 'OPENAI_101', statusCode: 500 };
export const GENERATE_CHAT_RESPONSE_ERROR = { message: 'Error generating chat response', errorCode: 'OPENAI_102', statusCode: 500 };
