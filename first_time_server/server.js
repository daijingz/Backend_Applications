const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const SHUTDOWN_SECRET = 'myShutdownKey'; // Replace with a strong secret if needed

// In-memory store for POSTed data
let dataStore = [];

// Middleware: parse incoming JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware: log each request time and route
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Route: Welcome page
app.get('/', (req, res) => {
  res.send('Hello. This is your Express backend server.');
});

// Route: Receive and store POSTed data
app.post('/api/data', (req, res) => {
  const data = req.body;
  dataStore.push(data);
  console.log('Stored data:', data);
  res.send('Data received and stored.');
});

// Route: View stored data
app.get('/api/data', (req, res) => {
  res.json(dataStore);
});

// Route: Server health check
app.get('/health', (req, res) => {
  res.send('Server is healthy and running.');
});

// Route: Show all defined routes
app.get('/routes', (req, res) => {
  const routes = app._router.stack
    .filter(r => r.route && r.route.path)
    .map(r => `${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
  res.send(routes.join('<br>'));
});

// Route: Show server info
app.get('/server-info', (req, res) => {
  res.json({
    status: 'running',
    port: PORT,
    uptime: `${process.uptime().toFixed(2)} seconds`,
    storedDataCount: dataStore.length,
    timestamp: new Date().toISOString()
  });
});

// Route: Shutdown server securely
app.post('/shutdown', (req, res) => {
  const { secret } = req.body;
  if (secret === SHUTDOWN_SECRET) {
    res.send('Server is shutting down.');
    console.log('Received shutdown request.');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  } else {
    res.status(403).send('Unauthorized shutdown attempt.');
  }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('SIGINT received. Closing server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});