import { Pinecone } from "@pinecone-database/pinecone";

import { FetchRelevantResponseFromPineconeError, InsertVectorToPineconeError } from "../../exceptions/pinecone.exceptions";
import { FETCH_RELEVANT_RESPONSE_FROM_PINECONE_ERROR, INSERT_VECTOR_TO_PINECONE_ERROR } from "../../constants/error.constants";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const indexName = "budget-rag";

export async function insertVectorDataToPinecone(payload: {
  responseVector: number[];
  text: string;
}) {
  try {
    const existingIndexes = await pc.listIndexes();
    if (
      !existingIndexes.indexes?.some(
        (index: { name: string }) => index.name === indexName
      )
    ) {
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
    const index = pc.index(indexName);
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

export async function queryPinecone(payload: {
    promptVector: number[];
}) {
    try {
        const index = pc.index(indexName);
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