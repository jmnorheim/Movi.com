import { CodegenConfig } from "@graphql-codegen/cli";
import { SERVER_URL } from "./src/interfaces";

const config: CodegenConfig = {
  schema: SERVER_URL,
  documents: ["./src/services/**/*.ts"],
  ignoreNoDocuments: true,
  generates: {
    "src/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
