const express = require("express");
const posts = require("../data/db");

const router = express.Router();

// GET REQUESTS

// When the client makes a `GET` request to `/api/posts`:
router.get("/posts", (req, res) => {
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
router.get("/posts/:id", (req, res) => {
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
router.get("/posts/:id/comments", (req, res) => {
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

// POST REQUESTS

// When the client makes a `POST` request to `/api/posts`:
// If the request body is missing the `title` or `contents` property:
router.post("/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }

  posts
    .insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

// When the client makes a `POST` request to `/api/posts/:id/comments`
router.post("/posts/:id/comments", (req, res) => {
  if (!req.body.text || !req.body.post_id) {
    return res.status(400).json({
      errorMessage: "Please provide text for the comment.",
    });
  }

  posts
    .insertComment(req.body.post_id)
    .then((comments) => {
      if (comments) {
        res.status(201).json(comments);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });
});


// PUT REQUESTS

// When the client makes a `PUT` request to `/api/posts/:id`

router.put("/posts/:id", (req, res) => {
    if (!req.body.title || !req.body.contents) {
      return res.status(400).json({
        message: "The post with the specified ID does not exist."
      });
    }
  
    posts
      .update(req.params.id, req.body)
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            errorMessage: "Please provide title and contents for the post."
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
            error: "The post information could not be modified.",
        });
      });
  });

// DELETE REQUESTS

// When the client makes a `DELETE` request to `/api/posts/:id`

router.delete("/posts/:id", (req, res) => {
    posts
      .remove(req.params.id)
      .then((count) => {
        if (count > 0) {
          res.status(200).json({
            message: "The post has been removed!",
          });
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
            error: "The post could not be removed",
        });
      });
  });
  

module.exports = router;
