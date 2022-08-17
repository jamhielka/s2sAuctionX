const http = require("http");
const express = require("express");
const cluster = require("cluster");
const compression = require("compression");
const numCPUs = require("os").cpus().length;
if (cluster.isMaster) {
  for (let i = 0; i < 1; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    cluster.fork();
  });
} else {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(compression());
  app.get("/api/healthcheck", function (request, response) {
    response.send(
      JSON.stringify({
        status: true,
        message: "running",
      })
    );
  });

  const path = __dirname;
  app.use(express.static(path));

  app.get(/.*/, (req, res) => res.sendFile(path + "/index.html"));

  httpServer.listen(80, function () {
    console.log("Server is listening on port " + 80);
  });
}
