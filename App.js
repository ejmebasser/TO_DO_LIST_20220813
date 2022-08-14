const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 5501;
const Post = require('./Post');
const path = require('path');
const bodyParser = require('body-parser');
const { nextTick } = require('process');

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

//console.log(path.join(__dirname, 'frontEnd.js'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res
    .status(200)
    .setHeader('Content-Type', 'text/html')
    .sendFile(path.join(__dirname, 'index.html'));
});

app.get('/db', async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.json(posts);
    return next();
  } catch (err) {
    res.json({ message: err });
  }
  next();
});

app.get('/db/:_id', async (req, res, next) => {
  try {
    const id = req.params._id;
    const posts = await Post.find({ _id: id });
    res.json(posts);
    return next();
  } catch (err) {
    res.json({ message: err });
  }
  next();
});

app.delete('/db/:_id', async (req, res, next) => {
  try {
    const id = req.params._id;
    console.log(id);
    const posts = await Post.findOneAndDelete({ _id: id });
    res.json(posts);
    return next();
  } catch (err) {
    res.json({ message: err });
  }
  next();
});

//WORKING ON FIND AND REPLACE
app.put('/db/:_id', async (req, res, next) => {
  try {
    const id = req.params._id;
    console.log(id);
    const posts = await Post.findOneAndReplace(
      { _id: id },
      { todoInput: req.body.todoInput },
      { new: true }
    );
    res.json(posts);
    return next();
  } catch (err) {
    res.json({ message: err });
  }
  next();
});
//WORKING ON FIND AND REPLACE

app.post('/db', async (req, res, next) => {
  const post = new Post({
    todoInput: req.body.todoInput,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
    next();
  } catch (err) {
    res.json({ message: err });
  }
});

app.use('/', express.static(path.resolve('./')));

mongoose.connect(
  'mongodb+srv://ejmebasser:Xh3wEicd7HdxO3FB@cluster0.e5krb.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true },
  () => console.log('Connected to MongoDB')
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.use('/', express.static(path.resolve(__dirname, '../assets')));
// app.get('/', (req,res) => {
//   return res.status(200).setHeader('Content-Type', 'text/html').sendFile(path.join(__dirname, '../views/index.html'));
// }
// );

module.exports = app;
