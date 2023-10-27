import { PrismaClient } from "@prisma/client";
import fs from "fs";
import readline from "readline";

const prisma = new PrismaClient();

const processDataFiles = async () => {
  const movies = {};

  const readMovies = readline.createInterface({
    input: fs.createReadStream("dataMovies.tsv"),
    output: process.stdout,
    terminal: false,
  });

  console.log("Hentet movies");

  let i = 0;
  let isFirstLine = true;

  // Reading and processing dataMovies.tsv
  for await (const line of readMovies) {
    if (isFirstLine) {
      isFirstLine = false;
      continue;
    }
    const [
      tconst,
      titleType,
      primaryTitle,
      originalTitle,
      isAdult,
      startYear,
      ,
      runtimeMinutes,
      genres,
    ] = line.split("\t");

    if (i++ % 10000 == 0) {
      console.log(tconst);
    }

    movies[tconst] = {
      imdbID: tconst,
      primaryTitle: primaryTitle.replace(/"/g, ""),
      originalTitle: originalTitle.replace(/"/g, ""),
      isAdult: Boolean(Number(isAdult)),
      startYear: startYear !== "\\N" ? Number(startYear) : 0,
      runtimeMinutes: runtimeMinutes !== "\\N" ? Number(runtimeMinutes) : 0,
      genres:
        genres !== "\\N"
          ? genres.split(",").map((genre) => genre.replace(/^"|"$/g, ""))
          : [],
    };
  }

  const readRatings = readline.createInterface({
    input: fs.createReadStream("dataRatings.tsv"),
    output: process.stdout,
    terminal: false,
  });

  console.log("Hentet ratings");

  i = 0;
  isFirstLine = true;

  // Reading and processing dataRatings.tsv
  for await (const line of readRatings) {
    if (isFirstLine) {
      isFirstLine = false;
      continue;
    }

    const [tconst, averageRating, numVotes] = line.split("\t");

    if (i++ % 10000 == 0) {
      console.log(tconst);
    }

    if (!movies[tconst]) {
      continue;
    } else {
      movies[tconst].averageRating = Number(averageRating);
      movies[tconst].totalVotes = Number(numVotes);
    }
  }

  console.log("Ferdig med ratings");
  i = 0;
  // Inserting the combined data into the database
  for (const imdbID in movies) {
    const movie = movies[imdbID];

    // Skip movie if it doesn't have an associated rating
    if (movie.averageRating === undefined) {
      continue;
    }
    if (i++ % 10000 == 0) {
      console.log(imdbID);
    }
    await prisma.movie.create({
      data: {
        imdbID: movie.imdbID,
        primaryTitle: movie.primaryTitle,
        originalTitle: movie.originalTitle,
        isAdult: movie.isAdult,
        startYear: movie.startYear,
        runtimeMinutes: movie.runtimeMinutes,
        averageRating: movie.averageRating,
        totalVotes: movie.totalVotes,
        // Assuming poster isn't provided in the snippets
        poster:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Ctext x='200' y='100' font-size='24' text-anchor='middle'%3ENo Image Available%3C/text%3E%3C/svg%3E",
      },
    });

    console.log("la inn alle filmer i database");

    // Insert genres if they exist
    for (const genreName of movie.genres) {
      let genre;
      // Check if genre already exists
      genre = await prisma.genre.findUnique({ where: { genreName } });
      if (!genre) {
        genre = await prisma.genre.create({ data: { genreName } });
      }

      await prisma.movieGenre.create({
        data: {
          imdbID: movie.imdbID,
          genreID: genre.genreID,
        },
      });
    }
  }
};

try {
  prisma.$connect();
  console.log("start");
  await processDataFiles();

  prisma.$disconnect();
  console.log("slutt");
} catch (error) {
  console.error("Error while processing the data:", error);
}
