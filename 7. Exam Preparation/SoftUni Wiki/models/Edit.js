const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const editSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    creationDate: { type: Schema.Types.Date, default: Date.now },
    title: { type: Schema.Types.String, required: true },
    content: { type: Schema.Types.String, required: true },
    article: { type: Schema.Types.ObjectId, ref: 'Article' }
});

module.exports = mongoose.model('Edit', editSchema);