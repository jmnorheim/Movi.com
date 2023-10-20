import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "../generated/type-graphql/index.js";
import { buildSchema } from "type-graphql";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient;
}

const context: Context = {
  prisma: prisma,
};

async function main() {
  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  const server = new ApolloServer<Context>({
    schema,
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
