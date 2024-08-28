require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const { Product, User } = require('./schema')
const jwt = require('jsonwebtoken')

const app = express()

function authenticateToken(req, res, next) {
  const token = req.headers.authorization

  if (token == null) return res.json({ flag: "error", error: 'token is NULL' })
  
  jwt.verify(token, process.env.JWT_KEY, (err, output) => {
    if (err) return res.json({ flag: "error", error: 'token authentication failed.' })

    req.output = output

    next()
  })
}

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

app.get('/', authenticateToken, async (req, res) => {
  const output = await getProducts()
  return res.json({ ...output })
})

app.get('/checktoken', authenticateToken, (req, res) => {
  return res.json({ output: req.output.output, flag: "success" })
})

app.post('/register', async (req, res) => {
  try{
    const userName = req.body.userName
    const password = req.body.password
    const firstName = req.body.firstName
    const lastName = req.body.lastName

    const output = { userName, firstName, lastName, password }

    const check = await User.findOne({ userName })

    if (!check){
      const inputUser = new User({ ...output })
      await inputUser.save()

      const token = jwt.sign({ output }, process.env.JWT_KEY, { expiresIn: '24h' })
      return res.json({ flag: "success", token }) 
    }

    return res.json({ flag: "error", output: "User already exists" })

  }catch(e){
    return res.json({ flag: "error", output: e })
  }
})

app.post('/login', async (req, res) => {

  try{
    const userName = req.body.userName
    const password = req.body.password
  
    const user = await User.findOne({ userName })

    if (!user) {
      return res.json({ flag: "error", output: "Username not found!" })
    }

    if (password === user.password){

      const output = { 
        firstName: user.firstName, 
        lastName: user.lastName,
        password: user.password,
        userName: user.userName 
      }

      const token = jwt.sign({ output }, process.env.JWT_KEY, { expiresIn: '24h' })
      return res.json({ flag: "success", token }) 
    }

    return res.json({ flag: "error", output: "Wrong password entered!" })
  
  }catch(e){
    return res.json({ flag: "error", output: e })
  }
})

app.post('/add', authenticateToken, async (req, res) => {
  const inputProduct = new Product({
    name: req.body.name, 
    price: parseFloat(req.body.price),
    desc: req.body.desc
  })

  try{
    await inputProduct.save()
    const output = await getProducts()
    return res.json({ ...output })
  }catch(e){
    return res.json({ flag: "error", output: e })
  }
})

app.post('/remove', authenticateToken, async (req, res) => {
  try{
    await Product.deleteOne({ _id: req.body._id })
    const output = await getProducts()
    return res.json({ ...output })
  }catch(e){
    return res.json({ flag: "error", output: e })
  }
})

mongoose.connect(dbURI).then(() => app.listen(port)).catch(err => console.log(err))