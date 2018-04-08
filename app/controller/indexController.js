exports.index = function (req, res) {
  console.log('INDEXCONTROLLER .INDEX')
  console.log('INDEXCONTROLLER .INDEX .RENDER INDEXVIEW')
  res.render('indexView', { validation: false, msg_email: false, msg_home: false })
}
