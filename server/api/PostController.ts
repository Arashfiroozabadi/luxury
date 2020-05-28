import express from 'express';
import chalk from 'chalk';
import rimraf from 'rimraf';
import { PhotoModel, Overview } from '../models';

const PostController = express.Router();


PostController.put('/put', async (req, res) => {
  const body = req.body.rowData;
  // console.log(body);
  await PhotoModel.deleteOne({ _id: body._id }).then(async (doc) => {
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
          if (err) return console.log(chalk.red.bgWhite.bold('Error in Update Chart Data'));
          if (updatedDoc.nModified === 1) {
            console.log(`[ ${chalk.blue.bold('info')} ]${chalk.green.bold('Chart Data Updated')}`);
          } else {
            return console.log(`[ ${chalk.yellow.bold('warning')} ] ${chalk.yellow.bgWhite.bold('NOT Modified ChartData')}`);
          }
          return null;
        },
      );
      console.log(`[ ${chalk.blue.bold('info')} ] Document with ID::" ${chalk.blue.underline(body._id)} ":: ${chalk.green.bgWhite.bold('Deleted')}`);
      const Path = `./public/static/uploads/${body.category}/${body.title}`;
      // console.log(process.cwd());

      await rimraf(Path, (err) => {
        if (err) {
          return console.log(`[ ${chalk.red.bold('Error')} ] Document directory folder Not Delet`);
        } return console.log(`[ ${chalk.blue.bold('info')} ] Documet directory Deleted successfully`);
      });
      res.sendStatus(200);
    } else {
      console.log(`[ ${
        chalk.yellow.bold('warning')
      } ] Document with ID::" ${chalk.blue.underline(body._id)} ":: ${chalk.yellow.bold('NOT Modified')}`);
      res.sendStatus(304);
    }
  });
});

export default PostController;
