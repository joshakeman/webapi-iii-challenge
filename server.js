const express = require('express');

const postsRouter = require('./data/hubs/postsRouter');
const usersRouter = require('./data/hubs/usersRouter')

const server = express();

server.use(express.json());
// server.use(upperCase)

server.get('/', (req, res) => {
  res.send(`
    <h2>Node blog</h2>
  `);
});

server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)

function upperCase(req, res, next) {
    let name = req.body.name

    if (name) {
        name = name.split(' ').map((str) => {
            let newString = str[0].toUpperCase()
            // console.log(str)
          
            return newString + str.slice(1)
            }
            
            ).join(' ') 

        console.log()
        req.body.name = name

        next()
    } else {
        res.status(401).send('Something is amiss here')
    }
}

module.exports = server