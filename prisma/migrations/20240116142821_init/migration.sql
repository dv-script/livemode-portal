-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "phoneNumber" VARCHAR(30) NOT NULL,
    "company" VARCHAR(60) NOT NULL,
    "password" VARCHAR(120) NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "roles" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestAnAccount" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(30) NOT NULL,
    "lastName" VARCHAR(60) NOT NULL,
    "email" VARCHAR(60) NOT NULL,
    "country" VARCHAR(60) NOT NULL,
    "state" VARCHAR(60) NOT NULL,
    "city" VARCHAR(60) NOT NULL,
    "address" VARCHAR(60) NOT NULL,
    "b2bPortal" BOOLEAN,
    "photoDatabase" BOOLEAN,
    "commentaryLiveSystem" BOOLEAN,
    "costumerServiceTool" BOOLEAN,
    "matchAnalysisHub" BOOLEAN,
    "mediaPortal" BOOLEAN,
    "phoneNumber" VARCHAR(30) NOT NULL,
    "company" VARCHAR(60) NOT NULL,

    CONSTRAINT "RequestAnAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RequestAnAccount_email_key" ON "RequestAnAccount"("email");
