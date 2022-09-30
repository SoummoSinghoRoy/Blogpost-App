const Profile = require('../models/Profile');
const User = require('../models/User');
const flash = require('../utils/Flash');

exports.uploadProfilePicGetController = async (req, res, next) => {
  try {
    let user = await User.findOne(null)

    if(!user) {
      return res.redirect('/auth/signup')
    }
    
    let defaultPics = "/uploads/default.png"
    let existUser = await User.findOne({user: req.user._id})

    if(existUser.profilePics !== defaultPics) {
      return res.redirect('/dashboard/create-profile')
    }

    let profile = await Profile.findOne({user: req.user._id})

    if(profile) {
      return res.redirect('/dashboard')
    }
    res.render('../views/pages/dashboard/upload-pic.ejs', {
        title: 'Upload your profile pic',
        flashMessage: flash.getMessage(req) 
    })
    
  } catch (error) {
    next(error)
  }

}

exports.uploadProfilePicPostController = async (req, res, next) => {
  if (req.file) {
    try {
      let profile = await Profile.findOne({user: req.user._id})
      let profilePics = `/uploads/${req.file.filename}`
      if(profile) {
        await Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: {profilePics} }
        )
      }
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: {profilePics} }
      )
      return res.redirect('/dashboard/create-profile')
    } catch (error) {
      res.status(500).json({
        profilePics: req.user.profilePics
      })
    }
  } else {
    res.render('../views/pages/dashboard/upload-pic.ejs', { 
      title: 'Upload your profile pic',
      flashMessage: flash.getMessage(req) 
    })
  }
}

// 19.3 Upload Controller and Routes -- etar router er kaj korechi routes -> uploadRoute.js e.