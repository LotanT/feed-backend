const dbService = require('../../services/db.service');
const externalService = require('../../services/external.service');
const ObjectId = require('mongodb').ObjectId;
const { notifyToUsers } = require('../../services/socket.service')

async function query() {
    try {
        const collection = await dbService.getCollection('Feed');
        const Feeds = await collection.find({}).toArray();
        return Feeds;
    } catch (err) {
        logger.error('cannot find Feeds', err);
        throw err;
    }
}


async function getById(FeedId) {
    try {
        const collection = await dbService.getCollection('Feed');
        const Feed = collection.findOne({ _id: ObjectId(FeedId) });
        return Feed;
    } catch (err) {
        console.log('Err with finding Feed')
        throw err;
    }
}

async function add(Feed) {
    try {
        const collection = await dbService.getCollection('feed');
        await collection.insertOne(Feed);
        return Feed;
    } catch (err) {
        console.log('Err with adding Feed')
        throw err;
    }
}

async function update(Feed) {
    try {
        let id = ObjectId(Feed._id);
        const collection = await dbService.getCollection('Feed');
        await collection.updateOne({ _id: id }, { $set: { ...Feed } });
        notifyToUsers(Feed)
        //Notify from socketservice - lets every socket know what's running
        return Feed;
    } catch (err) {
        console.log('Err with updating Feed')
        throw err;
    }
}

async function remove(FeedId) {
    try {
        const collection = await dbService.getCollection('Feed');
        await collection.deleteOne({ _id: ObjectId(FeedId) });
        return FeedId;
    } catch (err) {
        console.log('Err with deleting Feed')
        throw err;
    }
}


module.exports = {
    query,
    getById,
    add,
    update,
    remove
};
