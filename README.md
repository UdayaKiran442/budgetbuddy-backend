To install dependencies:
```sh
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

## Script to run schema migrations 
npx drizzle-kit generate

## Details of the project
- This project is a chatbot to answer user queries on budget on FY 2025-26.
- This chat bot is powered by LLM and RAG which ingests external knowledge to LLM via vector embeddings.
- Langchain is used to scrape the data from the url and parsing data from pdf's, ppt's.
- Open AI API's are used to generate vector embeddings of the data and the query prompt.
- Pinecone db for storing vector embeddings and fetching relavant context from the db based on prompt or user query.