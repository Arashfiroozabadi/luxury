import express from 'express';

import Loger from '../components/logers';
import { Post } from '../models';


const Search = express.Router();


Search.post('/search', async (req, res) => {
  const { cate, _id, name } = req.body;

  // search with ID if _id is true ----------------->
  if (_id) {
    await Post.findById(_id).then((result) => {
      res.send(result);
    }).catch((err) => {
      Loger('error', err);
      res.sendStatus(404);
    });
  }

  // search in Categorys if Category is true and _id is undefined true ----------------->
  if (_id === undefined && cate) {
    if (cate === 'all') {
      await Post.find({ title: name }).then((result) => {
        if (result.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(result);
        }
      }).catch((err) => {
        Loger('error', err);
        res.sendStatus(404);
      });
    } else {
      await Post.find({ category: cate, title: name }).then((result) => {
        if (result.length === 0) {
          res.sendStatus(404);
        } else {
          res.send(result);
        }
      }).catch((err) => {
        Loger('error', err);
        res.sendStatus(404);
      });
    }
  }
});

module.exports = Search;
