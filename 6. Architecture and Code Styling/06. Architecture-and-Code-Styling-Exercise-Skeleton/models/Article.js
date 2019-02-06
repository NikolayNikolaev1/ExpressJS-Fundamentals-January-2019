const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema ({
    title: { type: Schema.Types.String, required: true },
    content: { type: Schema.Types.String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Schema.Types.Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);

