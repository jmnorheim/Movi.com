-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MovieGenre" (
    "imdbID" TEXT NOT NULL,
    "genreID" INTEGER NOT NULL,

    PRIMARY KEY ("imdbID", "genreID"),
    CONSTRAINT "MovieGenre_genreID_fkey" FOREIGN KEY ("genreID") REFERENCES "Genre" ("genreID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MovieGenre_imdbID_fkey" FOREIGN KEY ("imdbID") REFERENCES "Movie" ("imdbID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MovieGenre" ("genreID", "imdbID") SELECT "genreID", "imdbID" FROM "MovieGenre";
DROP TABLE "MovieGenre";
ALTER TABLE "new_MovieGenre" RENAME TO "MovieGenre";
CREATE TABLE "new_LibraryMovie" (
    "libraryID" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,

    PRIMARY KEY ("libraryID", "imdbID"),
    CONSTRAINT "LibraryMovie_imdbID_fkey" FOREIGN KEY ("imdbID") REFERENCES "Movie" ("imdbID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "LibraryMovie_libraryID_fkey" FOREIGN KEY ("libraryID") REFERENCES "Library" ("libraryID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_LibraryMovie" ("imdbID", "libraryID") SELECT "imdbID", "libraryID" FROM "LibraryMovie";
DROP TABLE "LibraryMovie";
ALTER TABLE "new_LibraryMovie" RENAME TO "LibraryMovie";
CREATE TABLE "new_Library" (
    "libraryID" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "Library_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Library" ("libraryID", "name", "userID") SELECT "libraryID", "name", "userID" FROM "Library";
DROP TABLE "Library";
ALTER TABLE "new_Library" RENAME TO "Library";
CREATE INDEX "Library_libraryID_userID_idx" ON "Library"("libraryID", "userID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
