const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    names: {type: String, required: true},
    lastNames: {type: String, required: true},
    address: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: Number, required: true},
    file: {type: String,required: true}
},{
    timestamps: true,
    versionKey: false
})

module.exports = model('User', userSchema, 'users')