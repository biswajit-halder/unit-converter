const express = require('express');
const router = express.Router();
const converterController = require('../controllers/converterController');

router.post('/convert', converterController.convert);

module.exports = router;