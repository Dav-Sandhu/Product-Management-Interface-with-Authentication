const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: String,
    price: Number,
    desc: String
}, { collection: process.env.COLLECTION })

const Product = mongoose.model('Product', productSchema)
module.exports = Product