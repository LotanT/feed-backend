const socketService = require('../../services/socket.service.js');
const feedService = require('./feed.service.js');

// GET LIST feeds
async function getFeeds(req, res) {
    try {
        const feeds = await feedService.query();
        res.json(feeds);
    } catch (err) {
        res.status(500).send({ err: 'Failed to get feeds' });
    }
}

// POST (add feed)
async function addFeed(req, res) {
    try {
        const feed = req.body;
        console.log(feed)
        const addedFeed = await feedService.add(feed);
        res.json(addedFeed);
    } catch (err) {
        res.status(500).send({ err: 'Failed to add feed' });
    }
}

// PUT (Update feed)
async function updateFeed(req, res) {
    try {
        const feed = req.body;
        const updatedFeed = await feedService.update(feed);
        res.json(updatedFeed);
    } catch (err) {
        res.status(500).send({ err: 'Failed to update feed' });
    }
}


async function removeFeed(req, res) {
    try {
        const feedId = req.params.id;
        await feedService.remove(feedId);
        socketService.emitToFeeds('update-feed')
        return feedId
    } catch (err) {
        res.status(500).send({ err: 'Failed to remove feed' });
    }
}

module.exports = {
    getFeeds,
    addFeed,
    updateFeed,
    removeFeed,
};
