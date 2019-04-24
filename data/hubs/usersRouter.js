const express = require('express')

const Users = require('../helpers/userDB')

const Posts = require('../helpers/postDb')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
      const users = await Users.get(req.query);
      res.status(200).json(users);
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
    const user = await Users.getById(req.params.id);

    if (user) {
    res.status(200).json(user);
    } else {
    res.status(404).json({ message: 'User ain\'t here' });
    }
} catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
    message: 'Error retrieving the user',
    });
}
});

router.post('/', async (req, res) => {
    try {
      const user = await Users.insert(req.body);
      res.status(201).json(user);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding user',
      });
    }
  });
  
router.delete('/:id', async (req, res) => {
try {
    const user = await Users.remove(req.params.id);
    if (user) {
    res.status(200).json({ message: `That user is no more` });
    } else {
    res.status(404).json({ message: 'We couldn\'t find that user' });
    }
} catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
    message: 'Error removing the user',
    });
}


});

router.put('/:id', async (req, res) => {
    try {
      const user = await Users.update(req.params.id, req.body);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the user',
      });
    }
  });

  router.get('/:id/posts', async (req, res) => {
    try {
        const posts = await Users.getUserPosts(req.params.id);
    
        if (posts) {
        res.status(200).json(posts);
        } else {
        res.status(404).json({ message: 'There are no posts' });
        }
    } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
        message: 'Error retrieving those posts',
        });
    }
    });



  module.exports = router