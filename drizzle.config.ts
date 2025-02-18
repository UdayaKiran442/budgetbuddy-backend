import { defineConfig } from "drizzle-kit";

// Drizzle config to read the schema and generate the migrations
export default defineConfig({
  schema: "./src/repository/schema.ts",
  dialect: "postgresql",
});
