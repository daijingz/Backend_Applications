// Importing necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Creating an instance of Express
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world! This is your backend server.');
});

// Example POST route
app.post('/api/data', (req, res) => {
  const data = req.body;
  // Do something with the data (e.g., save to a database)
  console.log('Received data:', data);
  res.status(200).send('Data received successfully.');
});

// Define a port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
