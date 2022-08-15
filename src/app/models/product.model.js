const image = require('./image.model');
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

const subSchema = new schema({
    filename: {
        type: String,
    },
    contentType: {
        type: String,
    },
    imageBase64: {
        type: String,
    }
})

const Product = new schema({
    name: { type: 'string', },
    price: { type: 'number', },
    description: { type: 'string', default: 'No Decription for this product' },
    quantity: { type: 'number', default: 0 },
    image: { type: subSchema }
});

module.exports = mongoose.model('Products', Product);