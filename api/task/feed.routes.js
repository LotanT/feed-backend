const express = require('express');
const {getFeeds, addFeed, updateFeed, removeFeed} = require('./feed.controller');
const router = express.Router();

router.get('/', getFeeds);
router.post('/', addFeed);
router.put('/', updateFeed);
router.delete('/', removeFeed)


module.exports = router;
