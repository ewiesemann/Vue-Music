var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')
const SALT = 10

var Schema = mongoose.Schema

var schemaName = 'User'

var schema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    hash: {type: String, required: true}
})

schema.statics.generateHash = function (password) {
    return bcrypt.hashSync(password, SALT)
}

schema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.hash)
}





module.exports = mongoose.model(schemaName, schema)