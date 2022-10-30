const moment = require('moment');
const Flash = require('../utils/Flash');
const Post = require('../models/Post');
const Profile = require('../models/Profile');

function generatedate(days) {
  let date = moment().subtract(days, 'days')
  return date.toDate()
}

function generateFilterObject (filter) {
  let filterObj = {}
  let order = 1

  switch(filter) {
    case 'week': {
      filterObj = {
        createdAt: {
          $gt: generatedate(7)
        }
      },
      order = -1
      break
    }
    case 'month': {
      filterObj = {
        createdAt: {
          $gt: generatedate(30)
        }
      },
      order = -1
      break
    }
    case 'all': {
      order = -1
      break
    }
  }
  return {
    filterObj, order
  }
}

exports.explorerGetController = async (req, res, next) => {

  let filter = req.query.filter || 'latest'
  let currentPage = parseInt(req.query.page) || 1
  let itemPerPage = 10

  let { filterObj, order } = generateFilterObject(filter.toLowerCase())

  try {
    let posts = await Post.find(filterObj)
                          .sort(order === 1 ? '-createdAt' : 'createdAt')
                          .populate({
                            path: 'author', 
                            select: 'username'
                          })
                          .skip((itemPerPage * currentPage) - itemPerPage)
                          .limit(itemPerPage)

    let totalPost = await Post.countDocuments()
    let totalPage = totalPost / itemPerPage

    let bookmarks = []
    if(req.user) {
      let profile = await Profile.findOne({user: req.user._id})
      if(profile) {
        bookmarks = profile.bookmarks
      }
    }           

    res.render('../views/pages/explorer/explorer.ejs', {
      title: 'Explore all post',
      filter,
      posts,
      currentPage,
      itemPerPage,
      totalPage,
      bookmarks,
      flashMessage: Flash.getMessage(req)
    })

  } catch (error) {
    next(error)
  }
}

exports.singlePostPageGetController = async (req, res, next) => {
  let {postId} = req.params

  try {
    let post = await Post.findById(postId)
                         .populate('author', 'username profilePics')
                         .populate({
                          path: 'comments',
                          populate: {
                            path: 'user',
                            select: 'username profilePics'
                          }
                         })
                         .populate({
                          path:'comments',
                          populate: {
                            path: 'replies.user',
                            select: 'username profilePics'
                          }
                         })
    
    if(!post) {
      let error = new Error('404 page not found')
      error.status = 404
      throw error
    }

    let bookmarks = []

    if(req.user) {
      let profile = await Profile.findOne({user: req.user._id})
      if(profile) {
        bookmarks = profile.bookmarks
      }
    }

    res.render('../views/pages/explorer/singlePostPage.ejs', {
      title: post.title,
      flashMessage: Flash.getMessage(req),
      post,
      bookmarks
    })

  } catch (error) {
    next(error)
  }
}

// 22.1 Setup explorer files -- explorerGetController er modhye kaj kora hoyeche ebong er route handle kora hoyeche routes --> explorerRoute.js e.
// 22.2 Explorer Template -- explorerGetController er modhye kaj kora hoyeche.
// 22.3 Create Filter Functionalities -- explorerGetController er modhye kaj kora hoyeche.
// 22.4 Create Pagination Functionalities -- explorerGetController er modhye & eplorer.ejs e kaj kora hoyeche.
// 22.5 Add Bookmarks -- etar kaj korechi explorer.ejs, explorerGetController, public --> sript --> bookmarks.js e.
// 22.7 Single Page Controller -- etar kaj kora hoyeche singlePostPageGetController e & route handle korechi routes --> explorerRoute.js e.