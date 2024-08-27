const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    price: Number,
    desc: String
}, { collection: "Products"})

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    userName: String
}, { collection: "Users" })

const Product = mongoose.model('Product', productSchema)
const User = mongoose.model('User', userSchema)

module.exports = { User, Product }