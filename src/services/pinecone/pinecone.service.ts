import { Pinecone } from "@pinecone-database/pinecone";

import { FetchRelevantResponseFromPineconeError, InsertVectorToPineconeError } from "../../exceptions/pinecone.exceptions";
import { FETCH_RELEVANT_RESPONSE_FROM_PINECONE_ERROR, INSERT_VECTOR_TO_PINECONE_ERROR } from "../../constants/error.constants";

// Initialize Pinecone client
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

// Index name for the vector database
const indexName = "budget-rag";

// Insert vector data to Pinecone
export async function insertVectorDataToPinecone(payload: {
  responseVector: number[];
  text: string;
}) {
  try {
    // Check if the index already exists
    const existingIndexes = await pc.listIndexes();
    if (
      !existingIndexes.indexes?.some(
        (index: { name: string }) => index.name === indexName
      )
    ) {
      // Create the index if it doesn't exist
      await pc.createIndex({
        dimension: 1536,
        name: indexName,
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1",
          },
        },
      });
    }
    // Get the index
    const index = pc.index(indexName);
    // Upsert the vector data into the index
    await index.upsert([
      {
        id: crypto.randomUUID(),
        values: payload.responseVector,
        metadata: {
          text: payload.text,
        },
      },
    ]);
  } catch (error) {
    throw new InsertVectorToPineconeError(INSERT_VECTOR_TO_PINECONE_ERROR.message, INSERT_VECTOR_TO_PINECONE_ERROR.errorCode, INSERT_VECTOR_TO_PINECONE_ERROR.statusCode);
  }
}

// Query Pinecone for relevant responses
export async function queryPinecone(payload: {
    promptVector: number[];
}) {
    try {
        // Get the index
        const index = pc.index(indexName);
        // Query the index
        const queryResponse = await index.query({
            vector: payload.promptVector,
            topK: 10,
            includeMetadata: true,
        })
        return queryResponse;
    } catch (error) {
        throw new FetchRelevantResponseFromPineconeError(FETCH_RELEVANT_RESPONSE_FROM_PINECONE_ERROR.message, FETCH_RELEVANT_RESPONSE_FROM_PINECONE_ERROR.errorCode, FETCH_RELEVANT_RESPONSE_FROM_PINECONE_ERROR.statusCode);
    }
}