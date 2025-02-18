import OpenAI from "openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { PPTXLoader } from "@langchain/community/document_loaders/fs/pptx";

import { createEmbedding } from "../services/openai/openai.service";
import { insertVectorDataToPinecone } from "../services/pinecone/pinecone.service";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

// Script to ingest data from a PDF file into the vector database
export async function scrapeDataFromPdfScript(filePath: string) {
  try {
    // extract the text from the pdf
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();
    // split the text into chunks
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

// Script to ingest data from a URL into the vector database
export async function scrapeDataFromUrlScript(url: string) {
  try {
    const loader = new CheerioWebBaseLoader(url);
    const docs = await loader.load();
    const chunks = await splitter.splitDocuments(docs);
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
    return chunks;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Script to ingest data from a PPTX file into the vector database
export async function scrapeDataFromPptxScript(filePath: string) {
  try {
    const loader = new PPTXLoader(filePath);
    const docs = await loader.load();
    const chunks = await splitter.splitDocuments(docs);
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
    return chunks;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
