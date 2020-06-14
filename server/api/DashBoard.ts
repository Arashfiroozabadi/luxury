import express from 'express';

import { auth } from '../middleware';
import { Overview } from '../models';

const DashBoard = express.Router();


DashBoard.post('/overview', auth, (_req, res) => {
  Overview.findOne({}).then(
    (resualt) => {
      res.send(resualt);
    },
  );
});

module.exports = DashBoard;
