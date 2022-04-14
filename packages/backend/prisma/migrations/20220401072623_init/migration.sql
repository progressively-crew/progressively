-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "activationToken" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Project" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserProject" (
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "UserProject_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "Environment" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "clientKey" TEXT NOT NULL,

    CONSTRAINT "Environment_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Flag" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Flag_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "FlagEnvironment" (
    "flagId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'NOT_ACTIVATED',

    CONSTRAINT "FlagEnvironment_pkey" PRIMARY KEY ("flagId","environmentId")
);

-- CreateTable
CREATE TABLE "FlagHit" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flagEnvironmentFlagId" TEXT NOT NULL,
    "flagEnvironmentEnvironmentId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "FlagHit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "expired" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolloutStrategy" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "strategyRuleType" TEXT NOT NULL,
    "fieldName" TEXT,
    "fieldComparator" TEXT,
    "fieldValue" TEXT,
    "activationType" TEXT NOT NULL,
    "rolloutPercentage" INTEGER,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "RolloutStrategy_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PasswordResetTokens" (
    "uuid" TEXT NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,

    CONSTRAINT "PasswordResetTokens_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProject" ADD CONSTRAINT "UserProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Environment" ADD CONSTRAINT "Environment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagEnvironment" ADD CONSTRAINT "FlagEnvironment_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagEnvironment" ADD CONSTRAINT "FlagEnvironment_flagId_fkey" FOREIGN KEY ("flagId") REFERENCES "Flag"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagHit" ADD CONSTRAINT "FlagHit_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolloutStrategy" ADD CONSTRAINT "RolloutStrategy_flagEnvironmentFlagId_flagEnvironmentEnvir_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetTokens" ADD CONSTRAINT "PasswordResetTokens_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
