var objectId = require('mongodb').ObjectId
var Event = require('../models/eventModel')

exports.getMyEvents = function (req, res) {
  console.log('COURSECONTROLLER .MYEVENTS')
  var userId = req.session.user_current._id
  var eventModel = new Event()
  eventModel.getMyEvents(req, res, userId)
}

exports.goToEvent = function (req, res) {
  console.log('COURSECONTROLLER .GOTOEVENT')
  // var userId = req.session.user_current._id
  // var eventModel = new Event()
  // eventModel.getMyEvents(req, res, userId)
}
