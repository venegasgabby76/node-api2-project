const express = require("express");
const posts = require("../data/db");

const router = express.Router();

// When the client makes a `GET` request to `/api/posts`:
router.get("api/posts", (req, res) => {
  posts
    .find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

// When the client makes a `GET` request to `/api/posts/:id`:
router.get("/api/posts/:id", (req, res) => {
  posts
    .findById(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

// When the client makes a `GET` request to `/api/posts/:id/comments`
router.get("/api/posts/:id/comments", (req, res) => {
  posts
    .findCommentById(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
});

module.exports = router;
