const mongoose = require('mongoose');
const schema = mongoose.Schema;

const account = new schema({
    fullname: { type: 'string' },
    username: { type: 'string' },
    password: { type: 'string' },
    age: { type: 'number' },
    role: { type: 'number' }
}, {
    timestamps: true
})

module.exports = mongoose.model('Accounts', account);