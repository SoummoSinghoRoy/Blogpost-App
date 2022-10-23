const moment = require('moment');
const Flash = require('../utils/Flash');
const Post = require('../models/Post');

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

    res.render('../views/pages/explorer/explorer.ejs', {
      title: 'Explore all post',
      filter,
      posts,
      currentPage,
      itemPerPage,
      totalPage,
      flashMessage: Flash.getMessage(req)
    })

  } catch (error) {
    next(error)
  }
}

// 22.1 Setup explorer files -- explorerGetController er modhye kaj kora hoyeche ebong er route handle kora hoyeche routes --> explorerRoute.js e.
// 22.2 Explorer Template -- explorerGetController er modhye kaj kora hoyeche.
// 22.3 Create Filter Functionalities -- explorerGetController er modhye kaj kora hoyeche.
// 22.4 Create Pagination Functionalities -- explorerGetController er modhye & eplorer.ejs e kaj kora hoyeche.