import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const removeInvalidMovies = async () => {
  try {
    // Retrieve all movies where startYear, runtimeMinutes, or averageRating are 0 or null
    const moviesToRemove = await prisma.movie.findMany({
      where: {
        OR: [{ startYear: 0 }, { runtimeMinutes: 0 }, { averageRating: 0 }],
      },
    });

    console.log(`Found ${moviesToRemove.length} invalid movies to remove.`);

    for (const movie of moviesToRemove) {
      // Begin a transaction
      await prisma.$transaction(async (prisma) => {
        // Delete related MovieGenre entries
        await prisma.movieGenre.deleteMany({
          where: { imdbID: movie.imdbID },
        });

        // Delete the movie
        await prisma.movie.delete({
          where: { imdbID: movie.imdbID },
        });
      });

      console.log(`Removed movie with ID ${movie.imdbID} from the database.`);
    }

    console.log("All invalid movies have been removed successfully.");
  } catch (error) {
    console.error("Error while removing invalid movies:", error);
  }
};

try {
  prisma.$connect();
  console.log("Spooling up the cryo chambers:");
  await removeInvalidMovies();

  prisma.$disconnect();
  console.log("Ready for launch.");
} catch (error) {
  console.error("Error while processing the data:", error);
}
