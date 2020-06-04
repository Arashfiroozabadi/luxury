import express from 'express';

import {
  Post,
} from '../models';
import loger from '../components/logers';

const Production = express.Router();


Production.post('/production', async (req, res) => {
  const { target } = req.body;
  await Post.find({ category: target }).then(
    (posts) => {
      res.send(posts);
    },
  ).catch((errFindPost) => {
    loger('error', errFindPost);
    res.sendStatus(500);
    res.send({ msg: 'خطایی در سرور رخ داده است. صفحه را رفرش کنید.' });
  });
});

module.exports = Production;
