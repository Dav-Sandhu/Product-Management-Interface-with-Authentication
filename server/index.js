require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const Product = require('./schema')

const app = express()

const port = process.env.PORT ?? 3000
const dbURI = "mongodb+srv://" + process.env.USER + ":" + process.env.PASSWORD + 
	"@" + process.env.CLUSTER + "." + process.env.AUTH + ".mongodb.net/" + process.env.DATABASE + "?retryWrites=true&w=majority"

app.use(express.json())
app.use(cors())

const getProducts = async () => {
  try{
    const output = await Product.find()
    return { flag: "success", output }
  }catch(e){
    return { flag: "error", output: e } 
  }
}

app.get('/', async (req, res) => {
  const output = await getProducts()
  res.send({ ...output })
})

app.post('/add', async (req, res) => {
  const inputProduct = new Product({
    name: req.body.name, 
    price: parseFloat(req.body.price),
    desc: req.body.desc
  })

  try{
    await inputProduct.save()
    const output = await getProducts()
    res.send({ ...output })
  }catch(e){
    res.send({ flag: "error", output: e })
  }
})

app.post('/remove', async (req, res) => {
  try{
    console.log(req.body._id)
    await Product.deleteOne({ _id: req.body._id })
    const output = await getProducts()
    res.send({ ...output })
  }catch(e){
    res.send({ flag: "error", output: e })
  }
})

mongoose.connect(dbURI).then(() => app.listen(port)).catch(err => console.log(err))