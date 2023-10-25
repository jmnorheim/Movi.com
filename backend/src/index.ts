import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "../graphql/schema/index.js";
import { userResolver } from "../graphql/resolver/userResolver.js";
import { movieResolver } from "../graphql/resolver/movieResolver.js";


const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

const context: Context = {
  prisma: prisma,
};

async function main() {
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers: [userResolver, movieResolver],
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
