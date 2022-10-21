const Flash = require('../utils/Flash');
const Post = require('../models/Post');

exports.explorerGetController = async (req, res, next) => {

  try {
    let posts = await Post.find().populate({
      path: 'author',
      select: 'username'
    })

    res.render('../views/pages/explorer/explorer.ejs', {
      title: 'Explore all post',
      filter: 'latest',
      posts,
      flashMessage: Flash.getMessage(req)
    })

  } catch (error) {
    next(error)
  }
}

// 22.1 Setup explorer files -- explorerGetController er modhye kaj kora hoyeche ebong er route handle kora hoyeche routes --> explorerRoute.js e.
// 22.2 Explorer Template -- explorerGetController er modhye kaj kora hoyeche.