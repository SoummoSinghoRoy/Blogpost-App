const {Schema, model} = require('mongoose');

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
    maxlength: 5000
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: {
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

postSchema.index({
  title: 'text',
  body: 'text',
  tags: 'text'
},{
  weights: {
    title: 5,
    tags: 5,
    body: 2
  }
})

const Post = model('Post', postSchema);

module.exports = Post;

// 12.7 Comment Model -- etar kaj korechi Comment.js file e.

// 22.11 Create Search Backend -- searching keyword niye kaj kora hoyeche & controller er kaj kora hoyeche controllers --> searchController.js e.