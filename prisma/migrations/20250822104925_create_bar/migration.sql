-- CreateTable
CREATE TABLE "Bar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "bgDesign" TEXT NOT NULL,
    "fontStyle" TEXT NOT NULL,
    "fontWeight" TEXT NOT NULL,
    "fontSize" TEXT NOT NULL,
    "sticky" BOOLEAN NOT NULL,
    "active" BOOLEAN NOT NULL,
    "dismissible" BOOLEAN NOT NULL,
    "page" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Bar_id_key" ON "Bar"("id");
