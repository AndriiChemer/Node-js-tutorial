const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port);

// const server = http.createServer(app);
// server.listen(port, '192.168.80.222' || 'localhost', () => {console.log('App is listening on port 3000!')});