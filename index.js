const server = require('./server');

port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})