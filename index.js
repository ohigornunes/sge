// if ( process.env.NODE_ENV !== 'production') {
//   var dotenv = require('dotenv').load()
// }
const app = require('./config/server')

app.listen(process.env.PORT || 5000, () => {
  console.log('Listening ...')
})
