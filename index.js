const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/Users');

const app = express();
app.use(express.json());


const dotenv = require('dotenv')
dotenv.config()

const mongodb_atlas_url = process.env.MONGODB_URL;

mongoose.connect(mongodb_atlas_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Connected to MongoDB Atlas');
}).catch(error => {
  console.log('Error connecting to MongoDB Atlas');
  console.log(error);
})

// REST API
app.post('/users', async (req, res) => {
  const user = new userModel(req.body)

  try {
    await user.save((err) => {
      if (err) {
        res.send(err)
      }
      else {
        res.send(user)
      }
    })
  }
  catch (err) {
    res.status(500).send(err)
  }
})


app.listen({ port: process.env.PORT }, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})