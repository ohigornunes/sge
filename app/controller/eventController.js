var objectId = require('mongodb').ObjectId
var Event = require('../models/eventModel')

// exports.updateUserCurrentEnrolled = function (req, res, userIdStr) {
//   console.log('EVENTCONTROLLER .UPDATEUSERCURRENTENROLLED')
//   var eventModel = new Event()
//   eventModel.updateUserCurrentEnrolled(req, res, userIdStr)
// }

exports.event = function (req, res) {
  console.log('EVENTCONTROLLER .EVENT')
  console.log('EVENTCONTROLLER .EVENT .RENDER EVENTVIEW')
  res.render('eventView', {validation: {}, dataForm: {}})
}

exports.addEvent = function (req, res) {
  console.log('EVENTCONTROLLER .ADDEVENT')
  var event = req.body
  event.qtd_remained = req.body.qtd_total
  var ownerEmail = req.session.user_current.email
  var eventModel = new Event()
  eventModel.addEvent(req, res, event, ownerEmail)
}

exports.addEventFiles = function (req, res, filePath) {
  console.log('EVENTCONTROLLER .ADDEVENTFILES')
  var nameEdited = req.body
  console.log('nameEdited>>>>>>>>>>>>', nameEdited)
  var eventModel = new Event()
  eventModel.addEventFiles(req, res, filePath, nameEdited)
}

exports.enrollEvent = function (req, res) {
  console.log('EVENTCONTROLLER .ENROLLEVENT')
  var eventIdStr = req.query.event_id.toString()
  var userIdStr = req.session.user_current._id.toString()
  var eventModel = new Event()
  eventModel.enrollEvent(req, res, eventIdStr, userIdStr)
}

exports.unenrollEvent = function (req, res) {
  console.log('EVENTCONTROLLER .UNENROLLEVENT')
  var eventIdStr = req.query.event_id.toString()
  var userIdStr = req.session.user_current._id.toString()
  var eventModel = new Event()
  eventModel.unenrollEvent(req, res, eventIdStr, userIdStr)
}

exports.removeEvent = function (req, res) {
  console.log('EVENTCONTROLLER .REMOVEEVENT')
  var eventId = objectId(req.query.event_id)
  var eventModel = new Event()
  eventModel.removeEvent(req, res, eventId)
}

// exports.getMyEvents = function (req, res) {
//   console.log('EVENTCONTROLLER .GETMYEVENTS')
//   var userId = req.session.user_current._id
//   var eventModel = new Event()
//   eventModel.getMyEvents(req, res, userId)
// }

exports.getEventDetail = function (req, res) {
  console.log('EVENTCONTROLLER .GETEVENTDETAIL')
  var eventId = objectId(req.query.event_id)
  var eventModel = new Event()
  eventModel.getEventDetail(req, res, eventId)
}

exports.getAllEvents = function (req, res) {
  console.log('EVENTCONTROLLER .GETALLEVENTS')
  var eventModel = new Event()
  eventModel.getAllEvents(req, res)
}

exports.updateHome = function (req, res) {
  console.log('EVENTCONTROLLER .UPDATEHOME')
  var eventModel = new Event()
  eventModel.updateHome(req, res)
}

// exports.getMyEvents = function (req, res) {
//   console.log('eventController .getMyEvents')
//   var userID = req.session.user_current
//   req.session.user_current.my_events = true
//   Event.find({ users_enrolled: userID._id }).then(function (results) {
//     console.log('eventController .getMyEvents .render homeView')
//     res.render('homeView', { user: req.session.user_current, events: results })
//   }).catch(function (err) {
//     console.log(err)
//   })
// }

// Event.find({}).then(function (results) {
//   var userId = req.session.user_current._id
//   console.log(results.users_enrolled)
//   for (var i = 0; i < results.length; i++) {

//     if (userId === results.users_enrolled) {
//       console.log(results[i])
//       console.log('=======achouuuuresults======> ', results[i].users_enrolled)
//     }
//   }

// for (var i = 0; i < event.length; i++) {
//   console.log('=========iiiii=================>', i)

//   for (var j = 0; j < event.users_enrolled.length; j++) {
//     console.log('========jjjjj==================>', j)
//   }
// }
// results.events_enrolled.forEach(function () {
//   console.log('==================>>>>>>>>>>>>>>>>>', results.users_enrolled)
// })

// exports.enrollEvent = function (req, res) {
//   console.log('eventController .enroll')
//   var eventId = req.query.event_id
//   console.log(req.session.user_current._id)
//   // Event.findOne({ _id: eventId }).then(function (result) {
//   //   console.log('==========>', result)
//   //   console.log('acoaoaoaoaoao')
//   //   for (var i = 0; i < result.length; i++) {
//   //     console.log('ljalkajlakja', result[i])
//   //   }
//   // }).catch(function (err) {
//   //   console.log(err)
//   // })

//   Event.findByIdAndUpdate({ _id: objectId(eventId) }, { $push: { users_enrolled: req.session.user_current._id }, $inc: { qtd_remained: -1 } }, function (err, result) {
//     if (err) {
//       console.log(err)
//     } else {
//       Event.find({}).then(function (events) {
//         userController.enrollUser(req, res, eventId, events)
//         console.log('result event: ', events)
//       }).catch(function (err) {
//         console.log(err)
//       })
//     }
//   })
// }
