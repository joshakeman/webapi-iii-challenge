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

  router.get('/:id', async (req, res) => {
    
    try {
        const post = await Posts.getById(req.params.id);
    
        if (post) {
        res.status(200).json(post);
        } else {
        res.status(404).json({ message: 'Post ain\'t here' });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
        message: 'Error retrieving the post',
        });
    }
    });

    router.post('/', async (req, res) => {
        try {
          const post = await Posts.insert(req.body);
          res.status(201).json(post);
        } catch (error) {
          // log error to database
          console.log(error);
          res.status(500).json({
            message: 'Error adding post',
          });
        }
      });

      router.delete('/:id', async (req, res) => {
        try {
            const post = await Posts.remove(req.params.id);
            if (post) {
            res.status(200).json({ message: `That post is deleted` });
            } else {
            res.status(404).json({ message: 'We couldn\'t find that post' });
            }
        } catch (error) {
            // log error to database
            console.log(error);
            res.status(500).json({
            message: 'Error removing the post',
            });
        }
        
        
        });

        router.put('/:id', async (req, res) => {
    try {
      const post = await Posts.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    }
  });
      

  module.exports = router