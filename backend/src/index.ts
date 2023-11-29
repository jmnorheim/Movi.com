import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "../graphql/schema/index.js";
import { userResolver } from "../graphql/resolver/userResolver.js";
import { movieResolver } from "../graphql/resolver/movieResolver.js";
import { libraryResolver } from "../graphql/resolver/libraryResolver.js";

const prisma = new PrismaClient();

/**
 * Interface representing the context for Apollo Server resolvers.
 *
 * This context is passed to every resolver function in the Apollo Server setup, providing
 * them access to shared resources and utilities. In this case, it includes the Prisma client
 * instance for database interactions.
 *
 * @property prisma - Instance of PrismaClient for database operations.
 */
export interface Context {
  prisma: PrismaClient;
}

const context: Context = {
  prisma: prisma,
};

/**
 * Initializes and starts the Apollo Server.
 *
 * This asynchronous function sets up and starts an instance of Apollo Server configured with GraphQL
 * type definitions and resolvers. It uses Prisma Client for database interactions, integrating it through
 * the server's context. The server listens on a specified port (default is 4000) for incoming GraphQL requests.
 *
 * @remarks
 * - The Apollo Server is set up with GraphQL schema (`typeDefs`) and resolver functions (`resolvers`).
 * - The `startStandaloneServer` function from `@apollo/server/standalone` is used for easier setup.
 * - Server's context is prepared to include the Prisma client instance.
 * - On successful startup, the URL of the server is logged to the console.
 * - In case of an error during startup, the error is caught and logged.
 * - Ensures that the Prisma client disconnects gracefully when the server stops or an error occurs.
 *
 * @throws {Error} Catches and logs any error that occurs during server startup or Prisma client setup.
 */
async function main() {
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers: [userResolver, movieResolver, libraryResolver],
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => context,
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
