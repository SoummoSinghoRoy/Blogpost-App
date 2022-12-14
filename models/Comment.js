const {Schema, model} = require('mongoose');

const commentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    trim: true,
    required: true
  },
  replies: [
    {
      body: {
        type: String,
        required: true
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      createAt: {
        type: Date,
        default: new Date()
      }
    }
  ]
},{
  timestamps: true
})

const Comment = model('Comment', commentSchema);

module.exports = Comment;

// 12.8 Tweak Models - done.
// 13.1 Intro to this Chapter -- this chapter is for authentication system. etir jonyo je route lagbe tar kaj kora hoyeche routes folder er authRoute.js namok file e.