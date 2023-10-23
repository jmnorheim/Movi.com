import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { gql } from "graphql-tag";

const typeDefs = gql(readFileSync("../graphql/typeDefs.graphql", "utf-8"));

const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient;
}

const context: Context = {
  prisma: prisma,
};

async function main() {
  const server = new ApolloServer<Context>({
    typeDefs,
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
