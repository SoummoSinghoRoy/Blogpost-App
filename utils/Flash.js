// 16.3 Create Flash Class -- eta ke proyojon onujayi import korte hobe, apatoto eta import korechi playground er validator.js e.

class Flash {
  constructor (req) {
    this.req = req,
    this.success = this.extractFlashMessage('success'),
    this.fail = this.extractFlashMessage('fail')
  }
  extractFlashMessage (name) {
    let message = this.req.flash(name)
    return message.length > 0 ? message[0] : false
  }

  hasMessages () {
    return !this.success && !this.fail ? false : true
  }

  static getMessage (req) {
    let flash = new Flash(req)
    return {
      success: flash.success,
      fail: flash.fail,
      hasMessage: flash.hasMessages()
    }
  } 
}

module.exports = Flash