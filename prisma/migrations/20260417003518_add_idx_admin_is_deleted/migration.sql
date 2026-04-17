-- CreateIndex
CREATE INDEX "amdins_isDeleted_idx" ON "amdins"("isDeleted");

-- RenameIndex
ALTER INDEX "idx_admin_email" RENAME TO "amdins_email_idx";
