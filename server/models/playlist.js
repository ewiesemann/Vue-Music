
let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let schemaName = 'Playlist'

let songSchema = new Schema({
    artist: {type: String, required: true},
    title: {type: String, required: true}
})

let schema = new Schema({
    title: {type: String, required: true},
    song: [songSchema]
})

schema.pre('save', function(next){
    this.markModified('songs')
    next()
})


module.exports = mongoose.model(schemaName, schema)