// const express = require('express');
// const db = express();
// const Post = require('./Post');
// const path = require('path');
// const bodyParser = require('body-parser');
// const { nextTick } = require('process');

// // app.get('/', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'index.html'));
// // });

// //console.log(path.join(__dirname, 'frontEnd.js'));
// db.use(bodyParser.json());

// export const database = db.get('/db', async (req, res, next) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//     return next();
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// export const posting = db.post('/db', async (req, res, next) => {
//   const post = new Post({
//     todoInput: req.body.todoInput,
//   });
//   try {
//     const savedPost = await post.save();
//     res.json(savedPost);
//     next();
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// db.use('/', express.static(path.resolve('./')));
