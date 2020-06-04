import express from 'express';

import {
  Post,
} from '../models';
import Loger from '../components/logers';

const Banner = express.Router();


Banner.post('/banner', async (_req, res) => {
  await Post.find({ banner: true }).then((postResult) => {
    res.send(postResult);
  }).catch((errPostFind) => {
    Loger('error', errPostFind);
    res.sendStatus(404);
    res.send('banners not find in DB');
  });
});

module.exports = Banner;
