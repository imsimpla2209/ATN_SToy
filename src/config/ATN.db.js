const mongoose = require('mongoose');

module.exports = {
    connect: async() => {
        try {
            await mongoose.connect('mongodb+srv://hoangvip:Hoanghl1@cluster0.bwwj2pq.mongodb.net/ATN_dev');
            console.log('MongoDb connected');
        } catch (error) {
            console.log('MongoDb connection error: ' + error.message);
        }
    }
}