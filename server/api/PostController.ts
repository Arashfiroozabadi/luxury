import express from 'express';
import { PhotoModel } from '../models';

const PostController = express.Router();


PostController.put('/put', async (req, res) => {
  const { body } = req;
  await PhotoModel.deleteOne({ _id: body.id }).then((doc) => {
    if (doc.deletedCount === 1) {
      console.log('document deletet');
      res.sendStatus(200);
    } else {
      console.log('Document Not Modified');
      res.sendStatus(304);
    }
  });
});

export default PostController;
