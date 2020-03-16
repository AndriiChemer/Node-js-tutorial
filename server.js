const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port);

// const server = http.createServer(app);

// Work iMac 
// server.listen(port, '192.168.80.243' || 'localhost', () => {console.log('App is listening on port 3000!')});
// Home Mackbook
// server.listen(port, '192.168.0.164' || 'localhost', () => {console.log('App is listening on port 3000!')});
