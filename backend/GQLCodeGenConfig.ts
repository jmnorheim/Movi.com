import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * Configuration for GraphQL Code Generator.
 *
 * This configuration is used by `@graphql-codegen/cli` to generate TypeScript types and resolver signatures
 * based on the GraphQL schema files. It specifies the location of the GraphQL schema files and the output location
 * and settings for the generated TypeScript files.
 */
const config: CodegenConfig = {
  schema: "./graphql/schema/**/*.gql",
  generates: {
    "./generated/resolvers-types.ts": {
      config: {
        useIndexSignature: true,
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};
export default config;
