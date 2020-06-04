import express from 'express';

import { liaraClient, endPoint } from '../components/keys';
import loger from '../components/logers';
import {
  Overview,
  Post,
} from '../models';

const UploadController = express.Router();

UploadController.post('/upload', async (req: any, res) => {
  loger('error', req.files);
  if (req.files === undefined || req.files === null) return res.send({ auth: true, msg: 'لطفا تمام فیلد‌ها را وارد کنید', status: 'err' });
  const { file } = req.files;
  const { body } = req;

  if (req.files === undefined || body.name.length === 0 || body.cate.length === 0
      || body.desc.length === 0 || file.length === 0) {
    res.send({ auth: true, msg: 'لطفا تمام فیلد‌ها را وارد کنید', status: 'err' });
  } else {
    // handle upload single file
    if (file.length === undefined) {
      liaraClient.putObject(
        'images', `${body.cate}/${body.name}/${file.name}`,
        file.data,
        (putObjectErr:any, etag:string) => {
          if (putObjectErr) return loger('error', putObjectErr);
          loger('info', `images saved sucsses key=>${etag}`);

          const newPost = new Post({
            title: body.name,
            category: body.cate,
            description: body.desc,
            banner: body.banner,
            bannerPath: body.bannerPath,
            imagePath: [`https://${endPoint}/images/${body.cate}/${body.name}/${file.name}`],
          });
          return newPost.save((errPost:any, doc) => {
            if (!errPost) {
              Overview.updateOne({ 'category.name': body.cate },
                {
                  $inc: {
                    total: 1,
                    'category.$.value': 1,
                  },
                },
                { upsert: true },
                (err, d) => {
                  if (err) {
                    loger('error', err);
                    if (err.code === 2) {
                      Overview.find({},
                        (Err, overviewDoc: any) => {
                          if (Err) {
                            return loger('error', Err);
                          }
                          loger('info', `collection with ID ${overviewDoc[0]._id} found`);

                          const id = overviewDoc[0]._id;
                          return Overview.updateOne(
                            { _id: id },
                            {
                              $inc: {
                                total: 1,
                              },
                              $push: {
                                category: { name: body.cate, value: 1 },
                              },
                            },
                            (ERr, overUpdateDoc) => {
                              if (ERr) return loger('error', ERr);
                              loger('info', 'DB Update');
                              return loger('info', overUpdateDoc);
                            },
                          );
                        });
                    } else {
                      return loger('error', err);
                    }
                  }
                  return loger('info', d);
                });
              loger('info', doc);
              res.send({
                msg: 'ثبت شد',
                auth: true,
                status: 'ok',
              });
            } else {
              loger('error', errPost);
              res.send({
                msg: 'ثبت نشد',
                auth: true,
                status: 'err',
              });
            }
          });
        },
      );
    } else {
    // handle upload multipart files
      const uploadPrograss = file.map((data:any) => {
        liaraClient.putObject(
          'images', `${body.cate}/${body.name}/${data.name}`,
          data.data,
          (err:any, etag:string) => {
            if (err) return loger('error', err);
            return loger('info', `images saved sucsses key=>${etag}`);
          },
        );
        const imagePath:any = [];
        imagePath.push(`https://${endPoint}/images/${body.cate}/${body.name}/${data.name}`);
        return imagePath;
      });
      loger('info', uploadPrograss.length);
      const newPost = new Post({
        title: body.name,
        category: body.cate,
        description: body.desc,
        banner: body.banner,
        bannerPath: body.bannerPath,
        imagePath: uploadPrograss,
      });
      newPost.save((errNewPost:any, newPostDoc) => {
        if (!errNewPost) {
          Overview.updateOne({ 'category.name': body.cate },
            {
              $inc: {
                total: 1,
                'category.$.value': 1,
              },
            },
            { upsert: true },
            (err, d) => {
              if (err) {
                loger('error', err);
                if (err.code === 2) {
                  Overview.find({},
                    (Err, overviewDoc: any) => {
                      if (Err) {
                        return loger('error', Err);
                      }

                      loger('info', `collection with ID ${overviewDoc[0]._id} found`);

                      const id = overviewDoc[0]._id;
                      return Overview.updateOne(
                        { _id: id },
                        {
                          $inc: {
                            total: 1,
                          },
                          $push: {
                            category: { name: body.cate, value: 1 },
                          },
                        },
                        (ERr, overUpdateDoc) => {
                          if (ERr) return loger('error', ERr);
                          loger('info', 'DB Update');
                          return loger('info', overUpdateDoc);
                        },
                      );
                    });
                } else {
                  return loger('error', err);
                }
              }
              return loger('info', d);
            });
          loger('info', newPostDoc);
          return res.send({
            msg: 'ثبت شد',
            auth: true,
            status: 'ok',
          });
        }
        loger('error', errNewPost);
        return res.send({
          msg: 'ثبت نشد',
          auth: true,
          status: 'err',
        });
      });
    }
    return null;
  }
  return null;
});

module.exports = [
  UploadController,
];
