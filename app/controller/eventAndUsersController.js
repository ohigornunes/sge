var EventAndUsers = require('../models/eventAndUsersModel')

exports.email = function (req, res) {
  console.log('EVENTANDUSERSCONTROLLER .EMAIL')
  var eventIdStr = req.query.event_id.toString()
  var eventAndUsersModel = new EventAndUsers()
  eventAndUsersModel.email(req, res, eventIdStr)
}

exports.sendEmail = function (req, res) {
  console.log('EVENTANDUSERSCONTROLLER .SENDEMAIL')
  var eventId = req.session.user_current.event_id
  var eventAndUsersModel = new EventAndUsers()
  eventAndUsersModel.sendEmail(req, res, eventId)
}

exports.addEventAndUsers = function (req, res, eventIdStr, userIdStr, eventName, userEmail) {
  console.log('EVENTANDUSERSCONTROLLER .ADDEVENTANDUSER')
  var eventAndUsersModel = new EventAndUsers()
  eventAndUsersModel.addEventAndUsers(req, res, eventIdStr, userIdStr, eventName, userEmail)
}