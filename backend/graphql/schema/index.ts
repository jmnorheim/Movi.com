import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { print } from "graphql/language/printer";
import gql from "graphql-tag";
import path from "path";

const typesArray = loadFilesSync(path.join(__dirname, "."), {
  extensions: ["gql", "graphql"],
});

const typeDefs = mergeTypeDefs(typesArray, {});

const gqlTypeDefs = gql(print(typeDefs));

export default gqlTypeDefs;
