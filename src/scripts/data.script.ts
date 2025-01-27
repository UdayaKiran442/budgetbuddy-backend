import OpenAI from "openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { createEmbedding } from "../services/openai/openai.service";
import { insertVectorDataToPinecone } from "../services/pinecone/pinecone.service";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function dataScript(filePath: string) {
    try {
        // extract the text from the pdf
        const loader = new PDFLoader(filePath);
        const docs = await loader.load();
        // split the text into chunks
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });
        const chunks = await splitter.splitDocuments(docs);
        // convert the chunks to embeddings
        let pageCount = 0;
        for (const chunk of chunks) {
            const embedding = await createEmbedding(chunk.pageContent);
            await insertVectorDataToPinecone({
                responseVector: embedding.data[0].embedding,
                text: chunk.pageContent,
            });
            console.log(`Inserted page ${pageCount + 1} of ${chunks.length}`);
            pageCount++;
        }
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}