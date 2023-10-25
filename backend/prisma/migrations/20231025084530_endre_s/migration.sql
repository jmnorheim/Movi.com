-- CreateTable
CREATE TABLE "Genre" (
    "genreID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genreName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Library" (
    "libraryID" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Library_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "LibraryMovie" (
    "libraryID" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,

    PRIMARY KEY ("libraryID", "imdbID"),
    CONSTRAINT "LibraryMovie_imdbID_fkey" FOREIGN KEY ("imdbID") REFERENCES "Movie" ("imdbID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "LibraryMovie_libraryID_fkey" FOREIGN KEY ("libraryID") REFERENCES "Library" ("libraryID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Movie" (
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

-- CreateTable
CREATE TABLE "MovieGenre" (
    "imdbID" TEXT NOT NULL,
    "genreID" INTEGER NOT NULL,

    PRIMARY KEY ("imdbID", "genreID"),
    CONSTRAINT "MovieGenre_genreID_fkey" FOREIGN KEY ("genreID") REFERENCES "Genre" ("genreID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "MovieGenre_imdbID_fkey" FOREIGN KEY ("imdbID") REFERENCES "Movie" ("imdbID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserFavorites" (
    "userID" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,

    PRIMARY KEY ("userID", "imdbID"),
    CONSTRAINT "UserFavorites_imdbID_fkey" FOREIGN KEY ("imdbID") REFERENCES "Movie" ("imdbID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "UserFavorites_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_genreName_key" ON "Genre"("genreName");

-- CreateIndex
CREATE INDEX "Library_libraryID_userID_idx" ON "Library"("libraryID", "userID");

-- CreateIndex
CREATE INDEX "Movie_imdbID_primaryTitle_idx" ON "Movie"("imdbID", "primaryTitle");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_userID_email_idx" ON "User"("userID", "email");
