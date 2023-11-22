import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";

export const typeDefs = loadSchemaSync("./**/*.gql", {
  loaders: [new GraphQLFileLoader()],
});
