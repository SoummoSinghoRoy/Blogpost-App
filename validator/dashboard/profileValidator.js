const { body } = require('express-validator');
const validator = require('validator');

const urlValidator = value => {
  if(value) {
    if(!validator.isURL(value)) {
      throw new Error(`please provide correct url`)
    }
  }
  return true
}

module.exports = [
  body('name')
    .not().isEmpty().withMessage(`name can't be empty`)
    .isLength({max: 50}).withMessage(`name must be less then 50 charecter`)
    .trim()
  ,
  body('title')
    .not().isEmpty().withMessage(`title can't be empty`)
    .isLength({max: 100}).withMessage(`title must be less then 100 charecter`)
    .trim()
  ,
  body('bio')
    .not().isEmpty().withMessage(`bio can't be empty`)
    .isLength({max: 100}).withMessage(`bio must be less then 200 charecter`)
    .trim()
  ,
  body('website')
    .custom(urlValidator)
  ,
  body('facebook')
    .custom(urlValidator)
  ,
  body('twitter')
    .custom(urlValidator)
  ,
  body('userGithub')
    .custom(urlValidator)
  
]



// 19.7 Validate Profile -- ekhane user create form er validation korechi & eta import korechi dashboardRoute.js e ar validation result ke pass korbo createProfilePostController e view template e dekhanor jonyo.
// 19.8 Handle Error to Create Profile Page -- etar kaj korechi createProfilePostController & createProfile.ejs file e. 
// ami jokhon amar moto kore db te data save korar kaj korechi ebong validation ke rekhechi tokhon data db te store hocche na. ekhono etar kaj baki ache. muloto ekjon user tar profile create korar por ta ke apatoto dashboard e pathacchi. abar form validation o korte hobe karon kothao ekta vool hocche.
