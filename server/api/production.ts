import express from 'express';

import loger from '../components/logers';
import {
  Overview,
  Post,
} from '../models';

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


Production.post('/product', async (req, res) => {
  const { target } = req.body;
  Post.findOne({ _id: target }).then(
    async (resualt:any) => {
      Post.updateOne(
        { _id: target },
        { $addToSet: { views: req.connection.remoteAddress } },
        (err, d) => {
          if (err) return loger('error', err);

          if (d.nModified === 0) {
            return null;
          } if (d.nModified === 1) {
            loger('error', resualt.category);

            Overview.updateOne({ 'category.name': resualt.category },
              {
                $inc: {
                  totalView: 1,
                  'category.$.view': 1,
                },
              },
              (Err, D) => {
                if (Err) return loger('error', err);
                return loger('info', D);
              });
          }
          return loger('info', d);
        },
      );
      loger('info', resualt);
      res.send(resualt);
    },
  );
});

module.exports = Production;
