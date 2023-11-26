-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserFavorites" (
    "userID" TEXT NOT NULL,
    "imdbID" TEXT NOT NULL,

    PRIMARY KEY ("userID", "imdbID"),
    CONSTRAINT "UserFavorites_imdbID_fkey" FOREIGN KEY ("imdbID") REFERENCES "Movie" ("imdbID") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserFavorites_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User" ("userID") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserFavorites" ("imdbID", "userID") SELECT "imdbID", "userID" FROM "UserFavorites";
DROP TABLE "UserFavorites";
ALTER TABLE "new_UserFavorites" RENAME TO "UserFavorites";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
