CREATE TABLE "chat" (
	"chatId" varchar(255) PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"messageId" varchar(256) PRIMARY KEY NOT NULL,
	"chatId" varchar(256) NOT NULL,
	"prompt" text NOT NULL,
	"response" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX "chatId_idx" ON "chat" USING btree ("chatId");--> statement-breakpoint
CREATE INDEX "chatId_messages_idx" ON "messages" USING btree ("chatId");--> statement-breakpoint
CREATE UNIQUE INDEX "messageId_idx" ON "messages" USING btree ("messageId");