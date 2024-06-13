const app = require("./app");
const config = require("./utils/config.js");
const logger = require("./utils/logger");

app.listen(config.PORT, () => {
  logger.info(`Express server has been launched on port ${config.PORT}!`);
});

// const http = require("http");

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

// const PORT = 3001;
// app.listen(PORT);
// console.log(`Server running on port ${PORT}`);
