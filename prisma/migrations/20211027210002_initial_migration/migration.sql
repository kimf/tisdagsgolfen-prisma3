-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('STARTED', 'FINISHED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('INDIVIDUAL', 'TEAM');

-- CreateEnum
CREATE TYPE "EventScoring" AS ENUM ('POINTS', 'STROKES');

-- CreateEnum
CREATE TYPE "SeasonStatus" AS ENUM ('REGULAR', 'FINALS', 'FINISHED');

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "club" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "par" INTEGER NOT NULL DEFAULT 72,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "special" BOOLEAN NOT NULL DEFAULT false,
    "scoring" "EventScoring" NOT NULL DEFAULT E'POINTS',
    "status" "EventStatus" NOT NULL DEFAULT E'STARTED',
    "type" "EventType" NOT NULL DEFAULT E'INDIVIDUAL',
    "course" INTEGER NOT NULL,
    "season" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hole" (
    "id" SERIAL NOT NULL,
    "index" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "par" INTEGER NOT NULL,
    "course" INTEGER NOT NULL,

    CONSTRAINT "Hole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "photo" TEXT,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "resultValue" DOUBLE PRECISION NOT NULL,
    "eventPoints" DOUBLE PRECISION NOT NULL,
    "event" INTEGER NOT NULL,
    "player" INTEGER NOT NULL,
    "beers" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "kr" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "SeasonStatus" NOT NULL,
    "finalInfoId" INTEGER,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinalInfo" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "winner" INTEGER NOT NULL,
    "story" TEXT NOT NULL,

    CONSTRAINT "FinalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoringSession" (
    "id" SERIAL NOT NULL,
    "event" INTEGER NOT NULL,
    "currentHole" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ScoringSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlayerToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PlayerToScoringSession" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ScoringSessionToTeam" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Season_name_key" ON "Season"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToTeam_AB_unique" ON "_PlayerToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToTeam_B_index" ON "_PlayerToTeam"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToScoringSession_AB_unique" ON "_PlayerToScoringSession"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToScoringSession_B_index" ON "_PlayerToScoringSession"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ScoringSessionToTeam_AB_unique" ON "_ScoringSessionToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ScoringSessionToTeam_B_index" ON "_ScoringSessionToTeam"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_course_fkey" FOREIGN KEY ("course") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_season_fkey" FOREIGN KEY ("season") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hole" ADD CONSTRAINT "Hole_course_fkey" FOREIGN KEY ("course") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_event_fkey" FOREIGN KEY ("event") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_player_fkey" FOREIGN KEY ("player") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Season" ADD CONSTRAINT "Season_finalInfoId_fkey" FOREIGN KEY ("finalInfoId") REFERENCES "FinalInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinalInfo" ADD CONSTRAINT "FinalInfo_winner_fkey" FOREIGN KEY ("winner") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoringSession" ADD CONSTRAINT "ScoringSession_event_fkey" FOREIGN KEY ("event") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTeam" ADD FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToTeam" ADD FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToScoringSession" ADD FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToScoringSession" ADD FOREIGN KEY ("B") REFERENCES "ScoringSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScoringSessionToTeam" ADD FOREIGN KEY ("A") REFERENCES "ScoringSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScoringSessionToTeam" ADD FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
