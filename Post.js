const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  todoInput: String,
});

module.exports = mongoose.model('Post', PostSchema);
