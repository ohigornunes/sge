var eventController = require('../controller/eventController')

exports.home = function (req, res) {
  console.log('HOMECONTROLLER .HOME')
  // console.log('HOMECONTROLLER .HOME .RENDER HOMEVIEW')
  console.log('HOMECONTROLLER .EVENTCONTROLLER .GETMYEVENTS')
  eventController.getAllEvents(req, res)
  // res.render('homeView', { user_current: req.session.user_current, events: req.session.all_events })
}
