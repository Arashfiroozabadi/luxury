import express from 'express';
// import loger from '../components/logers';
import {
  Post,
} from '../models';

const chunks = require('array.chunk');


const AllProducts = express.Router();


AllProducts.get('/all', (req, res) => {
  const { chunk }:any = req.query;

  Post.find({}).then((resualt:any) => {
    let finalResult:string[] = [];
    finalResult = chunks(resualt, 5);

    if (chunk === undefined || chunk.length === 0) {
      res.send(finalResult);
    } else if (finalResult.length <= chunk) {
      res.sendStatus(404);
    } else {
      res.send({
        data: finalResult[chunk],
        chunkSize: finalResult.length,
      });
    }
  });
});

module.exports = AllProducts;
