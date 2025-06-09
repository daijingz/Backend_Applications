const express = require('express');
const router = express.Router();
const { handleQuestion } = require('../controllers/askController');

router.post('/ask', handleQuestion);

module.exports = router;