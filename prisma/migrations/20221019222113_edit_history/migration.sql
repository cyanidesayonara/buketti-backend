-- CreateTable
CREATE TABLE "EditHistory" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,
    "contentId" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "EditHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EditHistory" ADD CONSTRAINT "EditHistory_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "EditorContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditHistory" ADD CONSTRAINT "EditHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
