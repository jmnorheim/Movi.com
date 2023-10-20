-- MovieContent Table
CREATE TABLE Movie (
    imdbID TEXT PRIMARY KEY UNIQUE,
    primaryTitle TEXT,
    originalTitle TEXT,
    isAdult INTEGER,
    startYear INTEGER,
    runtimeMinutes INTEGER,
    averageRating REAL,
    totalVotes INTEGER,
    poster TEXT
);

-- Genre Table and Movie-Genre Relationship
CREATE TABLE Genre (
    genreID INTEGER PRIMARY KEY AUTOINCREMENT,
    genreName TEXT UNIQUE
);

CREATE TABLE MovieGenre (
    imdbID TEXT,
    genreID INTEGER,
    FOREIGN KEY (imdbID) REFERENCES Movie(imdbID),
    FOREIGN KEY (genreID) REFERENCES Genre(genreID),
    PRIMARY KEY (imdbID, genreID)
);

-- User Table
CREATE TABLE User (
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
);

-- User's Favorite Movies
CREATE TABLE UserFavorites (
    userID INTEGER,
    imdbID TEXT,
    FOREIGN KEY (userID) REFERENCES User(userID),
    FOREIGN KEY (imdbID) REFERENCES Movie(imdbID),
    PRIMARY KEY (userID, imdbID)
);

-- Library Table and Library-Movie Relationship
CREATE TABLE Library (
    libraryID INTEGER PRIMARY KEY AUTOINCREMENT,
    userID INTEGER,
    name TEXT,
    FOREIGN KEY (userID) REFERENCES User(userID)
);

CREATE TABLE LibraryMovie (
    libraryID INTEGER,
    imdbID TEXT,
    FOREIGN KEY (libraryID) REFERENCES Library(libraryID),
    FOREIGN KEY (imdbID) REFERENCES Movie(imdbID),
    PRIMARY KEY (libraryID, imdbID)
);
