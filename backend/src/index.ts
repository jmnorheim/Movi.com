import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "../graphql/schema/index.js";

const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient;
}

const context: Context = {
  prisma: prisma,
};

const resolvers = {
  Query: {
    users: async (_, __, context) => {
      return await prisma.user.findMany();
    },
  },
};

async function main() {
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
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
