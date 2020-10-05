const express = require("express");

const postRouter = require("./posts/posts-router")

const welcomeRouter = require("./welcome/welcome-router.js");

const server = express();
const port = 2727;

server.use(express.json());
server.use(postRouter)
server.use(welcomeRouter);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
