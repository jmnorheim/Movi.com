import { PrismaClient } from "@prisma/client";
import fs from "fs";
import readline from "readline";
import axios from "axios"; // Import axios

const prisma = new PrismaClient();

const fetchPoster = async (imdbID) => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=b797bf57`
    );
    console.log("Posterlink = ", response.data.Poster);
    return response.data.Poster;
  } catch (error) {
    console.error(`Error fetching poster for ${imdbID}:`, error);
    return null;
  }
};

const processDataFiles = async () => {
  const movies = await prisma.movie.findMany({
    orderBy: {
      totalVotes: "desc",
    },
    offset: 900,
    take: 900,
  });

  for (const movie of movies) {
    const posterUrl = await fetchPoster(movie.imdbID);
    if (posterUrl) {
      await prisma.movie.update({
        where: { imdbID: movie.imdbID },
        data: { poster: posterUrl },
      });
      console.log(`Updated poster for ${movie.imdbID}`);
    }
  }
};

try {
  prisma.$connect();
  console.log("Spooling up the cryo chambers:");
  await processDataFiles();

  prisma.$disconnect();
  console.log("Ready for launch.");
} catch (error) {
  console.error("Error while processing the data:", error);
}
