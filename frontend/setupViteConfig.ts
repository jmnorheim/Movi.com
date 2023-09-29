const fs = require("fs");

const configPath = "./vite.config.js";
const serverConfig = `
export default {
  server: {
    host: '0.0.0.0',
  },
};
`;

fs.readFile(configPath, "utf8", (err, data) => {
  if (err) {
    // If the file does not exist, create it with the server configuration
    fs.writeFile(configPath, serverConfig, "utf8", (err) => {
      if (err) throw err;
      console.log("vite.config.js has been created with server configuration.");
    });
  } else {
    // If the file exists, check if it already contains the server configuration
    if (!data.includes("host: '0.0.0.0'")) {
      fs.appendFile(configPath, serverConfig, "utf8", (err) => {
        if (err) throw err;
        console.log("Server configuration has been added to vite.config.js.");
      });
    } else {
      console.log("vite.config.js is already configured.");
    }
  }
});
