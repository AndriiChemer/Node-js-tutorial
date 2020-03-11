const express = require('express');
const router = express.Router();

const request = require('request');

const FeedController = require('../controllers/freebooks');

router.post('/', FeedController.get_one_feed);
router.post('/download', FeedController.downloadFile);
router.get('/test', FeedController.test);

module.exports = router;