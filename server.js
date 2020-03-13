const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Work iMac 
// server.listen(port, '192.168.80.222' || 'localhost', () => {console.log('App is listening on port 3000!')});
// Home Mackbook
server.listen(port, '192.168.0.164' || 'localhost', () => {console.log('App is listening on port 3000!')});
