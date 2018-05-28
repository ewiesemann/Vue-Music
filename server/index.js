var express = require('express')
var bp = require ('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())
require ('../server/db/mlab-config')


//REGISTER MIDDLEWEAR
app.use(bp.json())
app.use(bp.urlencoded({
 extended: true
}))

let auth = require('../server/auth/routes')
app.use(auth.session)
app.use(auth.routes)

var users = require('../server/routes/users')
var playlists = require('../server/routes/playlists')

app.use(playlists.router)

// app.use('/users/*', (req, res, next) => {
//     if (!req.session.uid) {
//       return res.status(401).send({
//         error: 'please login to continue'
//       })
//     }
//     next()
//   })

// app.get('*', (req, res, next) => {
//     res.status(404).send({
//       error: 'No matching routes'
//     })
//   })
 
app.listen(port, () => {
 console.log('server running on port', port)
})


