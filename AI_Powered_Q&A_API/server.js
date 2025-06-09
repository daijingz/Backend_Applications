const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const askRoute = require('./routes/askRoute');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api', askRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Q&A API running on port ${PORT}`);
});
