var mongoose = require('mongoose')
// require('dotenv').config()

// mongoose.connect(MONGODB_URI)
// var db = 'mongodb://localhost:27017/sgex'

if (process.env.MONGODB_URI) {
  console.log('mongoose connection is successful on: MLAB') // mongoose.connect(url)
  mongoose.connect(process.env.MONGODB_URI)
} else {
  mongoose.connect(process.env.MONGODB_LOCAL, function (err) { //db = 'mongodb://localhost/yourdb'
    if (err) {
      console.log(err)
    } else {
      console.log('mongoose connection is successful on: LOCAl ')
    }
  })
}

mongoose.Promise = global.Promise
module.exports = mongoose

// var mongoose = require('mongoose')
// /* Wrapper */
// var connMongoDB = function (params) {
//   var db = mongoose.connect('mongodb://localhost:27017/sgex')
//   mongoose.Promise = global.Promise
//   return db
// }
// /* Função exportada para executar no autoload */
// module.exports = function () {
//   return connMongoDB
// }