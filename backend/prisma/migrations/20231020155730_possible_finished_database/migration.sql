/*
  Warnings:

  - The primary key for the `UserFavorites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `isAdult` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Boolean`.
  - The primary key for the `Library` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LibraryMovies` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserFavorites" (
    "userID" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,

    PRIMARY KEY ("userID", "imdbID"),
    CONSTRAINT "UserFavorites_imdbID_fkey" FOREIGN KEY ("imdbID") REFERENCES "Movie" ("imdbID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "UserFavorites_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_UserFavorites" ("imdbID", "userID") SELECT "imdbID", "userID" FROM "UserFavorites";
DROP TABLE "UserFavorites";
ALTER TABLE "new_UserFavorites" RENAME TO "UserFavorites";
CREATE TABLE "new_User" (
    "userID" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "password", "userID", "username") SELECT "email", "password", "userID", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_User_1" ON "User"("username");
Pragma writable_schema=0;
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_User_2" ON "User"("email");
Pragma writable_schema=0;
CREATE INDEX "User_userID_email_idx" ON "User"("userID", "email");
CREATE TABLE "new_Movie" (
    "imdbID" TEXT NOT NULL PRIMARY KEY,
    "primaryTitle" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "isAdult" BOOLEAN NOT NULL,
    "startYear" INTEGER NOT NULL,
    "runtimeMinutes" INTEGER NOT NULL,
    "averageRating" REAL NOT NULL,
    "totalVotes" INTEGER NOT NULL,
    "poster" TEXT
);
INSERT INTO "new_Movie" ("averageRating", "imdbID", "isAdult", "originalTitle", "poster", "primaryTitle", "runtimeMinutes", "startYear", "totalVotes") SELECT "averageRating", "imdbID", "isAdult", "originalTitle", "poster", "primaryTitle", "runtimeMinutes", "startYear", "totalVotes" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE INDEX "Movie_imdbID_primaryTitle_idx" ON "Movie"("imdbID", "primaryTitle");
CREATE TABLE "new_Library" (
    "libraryID" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Library_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_Library" ("libraryID", "name", "userID") SELECT "libraryID", "name", "userID" FROM "Library";
DROP TABLE "Library";
ALTER TABLE "new_Library" RENAME TO "Library";
CREATE INDEX "Library_libraryID_userID_idx" ON "Library"("libraryID", "userID");
CREATE TABLE "new_LibraryMovies" (
    "libraryID" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,

    PRIMARY KEY ("libraryID", "imdbID"),
    CONSTRAINT "LibraryMovies_imdbID_fkey" FOREIGN KEY ("imdbID") REFERENCES "Movie" ("imdbID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "LibraryMovies_libraryID_fkey" FOREIGN KEY ("libraryID") REFERENCES "Library" ("libraryID") ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO "new_LibraryMovies" ("imdbID", "libraryID") SELECT "imdbID", "libraryID" FROM "LibraryMovies";
DROP TABLE "LibraryMovies";
ALTER TABLE "new_LibraryMovies" RENAME TO "LibraryMovies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
