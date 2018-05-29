var express = require('express')
var bp = require('body-parser')
var app = express()
var cors = require('cors')
var port = 3000

app.use(cors())

require ('../server/db/mlab-config')

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

//Code above is always the same

var playlists = require('../server/routes/playlists')

app.use(playlists.router)

app.get('*', (req, res, next) => {
     res.status(404).send({
       error: 'No matching routes'
     })
   })
 
app.listen(port, () => {
 console.log('server running on port', port)
})