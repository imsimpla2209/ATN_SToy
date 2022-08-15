const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const Image = new schema({
    productId: { type: ObjectId },
    filename: {
        type: String,
        unique: true,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    imageBase64: {
        type: String,
        required: true
    }
})

module.exports = UploadModel = mongoose.model('Images', Image);