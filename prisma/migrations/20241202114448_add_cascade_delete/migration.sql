-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_historyId_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History"("id") ON DELETE CASCADE ON UPDATE CASCADE;
