-- CreateTable
CREATE TABLE "Genre" (
    "genreID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genreName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Library" (
    "libraryID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Library_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "LibraryMovies" (
    "libraryID" INTEGER NOT NULL,
    "imdbID" TEXT NOT NULL,

    PRIMARY KEY ("libraryID", "imdbID"),
    CONSTRAINT "LibraryMovies_imdbID_fkey" FOREIGN KEY ("imdbID") REFERENCES "Movie" ("imdbID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "LibraryMovies_libraryID_fkey" FOREIGN KEY ("libraryID") REFERENCES "Library" ("libraryID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Movie" (
    "imdbID" TEXT NOT NULL PRIMARY KEY,
    "primaryTitle" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "isAdult" INTEGER NOT NULL,
    "startYear" INTEGER NOT NULL,
    "runtimeMinutes" INTEGER NOT NULL,
    "averageRating" REAL NOT NULL,
    "totalVotes" INTEGER NOT NULL,
    "poster" TEXT NOT NULL
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
    "userID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserFavorites" (
    "userID" INTEGER NOT NULL,
    "imdbID" TEXT NOT NULL,

    PRIMARY KEY ("userID", "imdbID"),
    CONSTRAINT "UserFavorites_imdbID_fkey" FOREIGN KEY ("imdbID") REFERENCES "Movie" ("imdbID") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "UserFavorites_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_Genre_1" ON "Genre"("genreName");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_User_1" ON "User"("username");
Pragma writable_schema=0;

-- CreateIndex
Pragma writable_schema=1;
CREATE UNIQUE INDEX "sqlite_autoindex_User_2" ON "User"("email");
Pragma writable_schema=0;
