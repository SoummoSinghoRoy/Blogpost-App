const Flash = require('../utils/Flash');
const User = require('../models/User');

exports.authorProfileGetController = async (req, res, next) => {
  let userId = req.params.userId

  try {
    let author = await User.findById(userId)
                          .populate({
                            path: 'profile',
                            populate: {
                              path: 'posts'
                            }   
                          })
                          
    res.render('pages/explorer/author.ejs', {
      title: 'Author Profile',
      flashMessage: Flash.getMessage(req),
      author
    })
  } catch (error) {
    next(error)
  }
}

// 22.14 author page template -- author page er controller er kaj kora hoyeche authorProfileGetController e & ekhane just controller er basic structure ta sajiyechi porer lecture e details kaj hobe, controller er route handle kora hoyeche routes --> authorRoute.js e.
// 22.15 Author Controller -- authorProfileGetController e kaj kora hoyeche.
// Task -- auhtor profile er sathe author er post gulo o populate kora hoyeche ei post gulo niye ui te dekhate hobe -- successfully done

// 23.1 Intro of Dashboard -- 
// 23.2 Bookmarks Dashboard Page -- etar kaj kora hoyeche dashboardRoute, dashBoardController, views --> pages --> dashboard --> bookmarks.ejs e.