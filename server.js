const express = require('express');

const postsRouter = require('./data/hubs/postsRouter');
const usersRouter = require('./data/hubs/usersRouter')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Node blog</h2>
  `);
});

server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)

module.exports = server