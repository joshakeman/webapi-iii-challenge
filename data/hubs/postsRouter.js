const express = require('express')

const Posts = require('../helpers/postDb')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
      const posts = await Posts.get(req.query);
      res.status(200).json(posts);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    }
  });

  module.exports = router