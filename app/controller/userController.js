var User = require('../models/userModel')
var crypto = require('crypto')
var objectId = require('mongodb').ObjectId

exports.register = function (req, res) {
  console.log('USERCONTROLLER .REGISTER')
  console.log('USERCONTROLLER .REGISTER .RENDER REGISTERVIEW')
  res.render('registerView', { validation: {}, msg_email: {}, msg_home: {} })
  //#Editar aqui
  // if (req.body) {
  //   res.redirect('/home') 
  // }
}

exports.addUser = function (req, res) {
  console.log('USERCONTROLLER .ADDUSER')
  var user = req.body
  if (req.body.password === req.body.password_confirm) {
    var passwordCrypto = crypto.createHash('md5').update(user.password).digest('hex')
    user.password = passwordCrypto
    var userModel = new User()
    userModel.addUser(req, res, user)
  }
}

exports.auth = function (req, res) {
  console.log('USERCONTROLLER .AUTH')
  var passwordCrypto = req.body.password
  var email = req.body.email
  passwordCrypto = crypto.createHash('md5').update(passwordCrypto).digest('hex')
  var userModel = new User()
  userModel.auth(req, res, email, passwordCrypto)
}

exports.logOut = function (req, res) {
  console.log('USERCONTROLLER  .LOGOUT')
  req.session.destroy(function (errors) {
    console.log('SESSÃO DESTRUÍDA!')
    console.log('USERCONTROLLER .LOGOUT .REDIRECT /')
    res.redirect('/')
  })
}

exports.turnAdmin = function (req, res) {
  console.log('USERCONTROLLER .TURNADMIN')
  var id = objectId(req.query.user_id)
  var userModel = new User()
  userModel.turnAdmin(req, res, id)
}

exports.turnUser = function (req, res) {
  console.log('USERCONTROLLER .TURNUSER')
  var id = objectId(req.query.user_id)
  var userModel = new User()
  userModel.turnUser(req, res, id)
}

exports.deleteUser = function (req, res) {
  console.log('USERCONTROLLER .DELETEUSER')
  var userIdObject = objectId(req.query.user_id)
  var userModel = new User()
  userModel.deleteUser(req, res, userIdObject)
}

exports.getAllUsers = function (req, res) {
  console.log('USERCONTROLLER .GETALLUSERS')
  var userModel = new User()
  userModel.getAllUsers(req, res)
}

exports.enrollUser = function (req, res, eventIdStr, userIdStr, eventName, userEmail) {
  console.log('USERCONTROLLER .ENROLLUSER')
  var userModel = new User()
  userModel.enrollUser(req, res, eventIdStr, userIdStr, eventName, userEmail)
}

// User.update(user.user_type).then(function (users) {
//   console.log('Atualizado')
// }).catch(function (err) {
//   console.log(err)
// })

// // User PUT
// router.put('/user/:id', function (req, res) {
//   console.log('IndexRoute /user/:id userView (PUT)')
//   console.log('ID passado = ', req.params.id)
//   User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
//     User.findOne({ _id: req.params.id }).then(function (user) {
//       res.send(user)
//     })
//   })
// })
