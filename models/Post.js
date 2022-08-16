const {Schema, model} = require('mongoose');
// const Comment = require('./Comment');

const postSchema = new Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 100,
    required: true
  },
  body: {
    type: String,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tag: {
    type: [String],
    required: true
  },
  thumbnail: String,
  readTime: String,
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
}, {
  timestamps: true
})

const Post = model('Post', postSchema);

module.exports = Post;

// 12.7 Comment Model -- etar kaj korechi Comment.js file e.