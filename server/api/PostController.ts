import express from 'express';
import chalk from 'chalk';
import { PhotoModel, Overview } from '../models';

const PostController = express.Router();


PostController.put('/put', async (req, res) => {
  const body = req.body.rowData;
  // console.log(body);
  await PhotoModel.deleteOne({ _id: body._id }).then((doc) => {
    if (doc.deletedCount === 1) {
      Overview.updateOne(
        {
          name: 'overview',
          'category.name': body.category,
        },
        {
          $inc: {
            total: -1,
            'category.$.value': -1,
          },
        }, (err, updatedDoc) => {
          if (err) return console.log(err);
          if (updatedDoc.nModified === 1) {
            return console.log(chalk.green.bold('Chart Data Updated'));
          }
          return console.log(chalk.red.bgWhite.bold('Error in Update Chart Data'));
        },
      );
      console.log(`Document with ID::" ${chalk.blue.underline(body._id)} ":: ${chalk.green.bgWhite.bold('Deleted')}`);
      res.sendStatus(200);
    } else {
      console.log(`Document with ID::" ${chalk.blue.underline(body._id)} ":: ${chalk.yellow.bgWhite.bold('NOT Modified')}`);
      res.sendStatus(304);
    }
  });
});

export default PostController;
