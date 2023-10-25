import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "../graphql/schema/index.js";
import { Resolvers } from "../generated/resolvers-types.js";
import { movieResolver } from "../graphql/resolver/movieResolver.js";

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
}

const context: Context = {
  prisma: prisma,
};

// const resolvers: Resolvers = {
//   Query: {
//     users: async (_, __, context: Context) => {
//       const users = await context.prisma.user.findMany();
//       const fav = await context.prisma.userFavorites.findMany({
//         where: { userID: { in: users.map((user) => user.userID) } },
//       });
//       console.log(fav);

//       const tmp = users.map((user) => ({
//         ...user,
//         favorites: [],
//         library: [],
//       }));

//       console.log(tmp);
//       return tmp;
//     },
//   },
// };

async function main() {
  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers: movieResolver,
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
