const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const arcticleSchema = new Schema({
    title: { type: Schema.Types.String, required: true },
    content: { type: Schema.Types.String, required: true },
    isLocked: { type: Schema.Types.Boolean, default: false },
    creationDate: { type: Schema.Types.Date, default: Date.now },
    edits: [{ type: Schema.Types.ObjectId, ref: 'Edit' }]
});

module.exports = mongoose.model('Article', articleSchema);