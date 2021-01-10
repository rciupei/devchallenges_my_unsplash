const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const fetch = require('node-fetch');
const loremIpsum = require("lorem-ipsum").loremIpsum;
const Image = require('./models/image');
const { sort } = require('methods');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
};



app.get('/', async (req, res) => {
  const allImages = await Image.find().sort({
    createdAt: -1
  })
  res.send(allImages);
});

app.post('/add', async (req, res) => {
  const { imageUrl, imageDescription } = req.body;
  const newImage = new Image({ imageUrl, imageDescription })
  await newImage.save()
  res.send(newImage)
})

// add random image
app.get('/add-random', async (req, res) => {
  const imageUrl = await fetch("https://source.unsplash.com/random/").then(data => {
    return data.url
  });
  const newImage = new Image({
    imageUrl,
    imageDescription: loremIpsum()
  })
  await newImage.save()
  res.send(newImage)
})

app.delete('/remove/:id', async (req, res) => {
  const deleted = await Image.findOneAndDelete({ _id: req.params.id })
  res.send(deleted)
})

connectDb().then(() => {
  app.listen(process.env.PORT, '127.0.0.1', () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
  );
});