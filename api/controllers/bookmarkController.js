const Profile = require('../../models/Profile')

exports.blogPostBookmarksGetController = async (req, res, next) => {
  let {postId} = req.params

  if(!req.user) {
    res.status(403).json({
      error: 'you are not an authenticated user'
    })
  }
  let userId = req.user._id
  let bookmark = null;

  try {
    let profile = await Profile.findOne({user: userId})

    if(profile.bookmarks.includes(postId)) {
      await Profile.findOneAndUpdate(
        {user: userId},
        {$pull: {'bookmarks': postId}}
      )
      bookmark = false
    } else{
      await Profile.findOneAndUpdate(
        {user: userId},
        {$push: {'bookmarks': postId}}
      )
      bookmark = true
    }
    res.status(200).json({
      bookmark
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'server error occured'
    })
  }
}

// 21.6 Create Bookmarks Controller API -- etar kaj kora hoyeche blogPostBookmarksGetController e & route hanlde kora hoyeche apiRoute.js.

// 22.1 Setup explorer files (eta stack learner er youtube playlist e missing tai oder official site er course theke korechi) -- etar kaj kora hoyeche views --> pages --> explorer --> explorer.ejs, controller --> explorerController.js e