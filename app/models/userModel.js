var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')
var objectId = require('mongodb').ObjectId
var eventController = require('../controller/eventController')
var eventAndUsersController = require('../controller/eventAndUsersController')

// Model users
var UserSchema = new Schema({
  first_name: { type: String, required: [true, 'O mome é obrigatório!'] },
  last_name: { type: String, required: [true, 'O sobrenome é obrigatório!'] },
  email: { type: String, required: [true, 'O email é obrigatório!'], index: { unique: true } },
  password: { type: String, required: [true, 'A senha é obrigatório!'] },
  user_type: { type: String, default: 'user' },
  events_enrolled: [{ type: String }],
  created_at: { type: Date, required: true, default: Date.now }
})

UserSchema.methods.addUser = function (req, res, user) {
  console.log('USERMODEL .ADDUSER')
  User.create(user)
    .then(function (result) {
      console.log('USERMODEL .ADDUSER .REDIRECT /')
      res.render('indexView', { validation: false, msg_email: false, msg_home: false })
    })
    .catch(function (err) {
      console.log(err)
      console.log('USERMODEL .ADDUSER .REDIRECT /REGISTER')
      res.redirect('/register')
    })
}

UserSchema.methods.auth = function (req, res, email, passwordCrypto) {
  console.log('USERMODEL .AUTH')
  User.findOne({ email: email })
    .then(function (result) {
      if (result.password === passwordCrypto) {
        req.session.user_current = result
        req.session.user_current.authorized = true
        req.session.user_current.msg_selected_my_events = false
        req.session.user_current.msg_added_one_event = false
        req.session.user_current.msg_sended_email_all = false
        req.session.user_current.msg_user_enroll_success = false
        // req.session.user_current.event_id = false
        // var user_id_str = result._id.toString()
        // req.session.user_current.user_id_str = user_id_str
        // req.session.user_current.user_id_str = result._id.toString()
        // var userIdStr = result._id.toString()
        console.log('SESSÃO CRIADA PARA: ', req.session.user_current)
        res.redirect('/get-all-events')
        // eventController.getAllEvents(req, res)
        // eventController.updateUserCurrentEnrolled(req, res, userIdStr)
      } else {
        console.log('SENHA OU EMAIL ERRADA!')
        console.log('USERCONTROLLER .AUTH .REDIRECT /')
        res.redirect('/')
      }
    })
    .catch(function (err) {
      console.log(err)
      console.log('USUÁRIO NÃO EXISTE NO BD!')
      console.log('USERCONTROLLER .AUTH .REDIRECT /')
      res.redirect('/')
    })
}

UserSchema.methods.turnAdmin = function (req, res, id) {
  console.log('USERMODEL .TURNADMIN')
  User.findOneAndUpdate({ _id: id }, { $set: { user_type: 'admin' } })
    .then(function (result) {
      console.log('USERMODEL .TURNADMIN .REDIRECT /USERS')
      res.redirect('/users')
    })
    .catch(function (err) {
      console.log(err)
    })
  // mongoose.connection.close()
}

UserSchema.methods.turnUser = function (req, res, id) {
  console.log('USERMODEL .TURNUSER')
  User.findOneAndUpdate({ _id: id }, { $set: { user_type: 'user' } })
    .then(function (result) {
      console.log('USERMODEL .TURNADMIN .REDIRECT /USERS')
      res.redirect('/users')
    })
    .catch(function (err) {
      console.log(err)
    })
  // mongoose.connection.close()
}

UserSchema.methods.deleteUser = function (req, res, userIdObject) {
  console.log('USERMODEL .DELETEUSER')
  User.findByIdAndRemove({ _id: userIdObject })
    .then(function (result) {
      console.log('DELETADO COM SUCESSO!')
      console.log('USERMODEL .DELETEUSER .REDIRECT /USERS')
      res.redirect('/users')
    })
    .catch(function (err) {
      console.log(err)
    })
  // mongoose.connection.close()
}

UserSchema.methods.getAllUsers = function (req, res) {
  console.log('USERMODEL .GETALLUSERS')
  User.find({})
    .then(function (results) {
      console.log('USERMODEL .GETALLUSERS .RENDER USERSVIEW')
      res.render('usersView', { user_all: results, user_current: req.session.user_current })
    })
    .catch(function (err) {
      console.log(err)
      console.log('USERMODEL .GETALLUSERS .REDIRECT /HOME')
      req.redirect('/home')
    })
  // mongoose.connection.close()
}

UserSchema.methods.enrollUser = function (req, res, eventIdStr, userIdStr, eventName, userEmail) {
  console.log('USERMODEL .ENROLLUSER')
  User.findByIdAndUpdate({ _id: userIdStr }, { $push: { events_enrolled: eventIdStr } })
    .then(function (result) {
      console.log('>>> Cadastrado ID do evento no usuário')
      // eventController.updateUserCurrentEnrolled(req, res, userIdStr)
      console.log('USERMODEL .ENROLLUSER .UPDATEHOME')
      eventController.updateHome(req, res)
      console.log('USERMODEL .ENROLLUSER .ADDEVENTANDUSER')
      // res.redirect('/home')
    })
    .catch(function (err) {
      console.log(err)
    })
  eventAndUsersController.addEventAndUsers(req, res, eventIdStr, userIdStr, eventName, userEmail)
  // mongoose.connection.close()
}

UserSchema.post('save', function (doc) {
  console.log('Criou/Salvou com sucesso!')
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

var User = mongoose.model('users', UserSchema)
module.exports = User

// var SALT_WORK_FACTOR = 10;
// UserSchema.pre('save', function (next) {
//   var user = this

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next()

//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//     if (err) return next(err)

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err)

//       // override the cleartext password with the hashed one
//       user.password = hash
//       next()
//     })
//   })
// })