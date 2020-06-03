import express from 'express';
import multer from 'multer';
import mkdirp from 'mkdirp';
import chalk from 'chalk';
import fs from 'fs';

import loger from '../components/logers';
import {
  User,
  Overview,
  Post,
  Img,
} from '../models';

const Liara = require('@liara/sdk');

const PostController = require('./PostController');

declare const Buffer: { from: new (arg0: string, arg1: string) => any; };
const AccountController = express.Router();


const liaraClient = new Liara.Storage.Client({
  accessKey: 'Z3SBHOIW4DM5VL9YTHRJF',
  secretKey: 'ejoUJJEe4yqkUYFohJZtYprSxWSqT8wC9Thv9AOBQ',
  endPoint: '5ed778ad1c92cc0011b11ead.liara.space',
});

const storage = multer.diskStorage({
  destination(req: any, _files: any, cb) {
    const dest = `uploads/${req.body.cate}/${req.body.name}`;
    mkdirp.sync(`statics/${dest}`);
    cb(null, `statics/${dest}`);
  },
  filename(_req: any, file, cb) {
    cb(null, file.originalname);
    // console.log(file);
  },
});
function filters(req: any, file: any, cb: any) {
  // const files = req.files

  if (req.body.name.length === 0 || req.body.cate.length === 0 || req.body.desc.length === 0 || file === undefined) {
    cb('لطفا تمام فیلد‌ها را وارد کنید', false);
  }
  if (file.mimetype !== 'image/jpeg') {
    cb('file type not allow', false);
  }
  cb(null, true);
}
const upload = multer({
  storage,
  fileFilter: filters,
});

AccountController.post('/auth', (req: any, res) => {
  if (req.session.auth) {
    res.send({ auth: true, test: req.session.auth, msg: 'وارد شدید' });
  } else {
    res.send({ auth: false });
  }
});

AccountController.post('/login', upload.single('file'), (req: any, res) => {
  const body = req.body.form;

  if (body.userName.length <= 0) {
    res.send({ msg: 'نام کاربری را وارد کنید' });
  } else if (body.pass.length <= 0) {
    res.send({ msg: 'رمز عبور را وارد کنید' });
  } else if (req.session.auth === undefined) {
    User.findOne({ userName: body.userName, pass: body.pass }).then(
      (resualt: any) => {
        if (resualt === null) {
          res.send({ msg: 'نام کاربری و یا رمز عبور اشتباه است' });
        } else {
          req.session.auth = { username: body.userName };
          res.send({ auth: true, userName: resualt.userName, msg: 'وارد شدید' });
        }
      },
    );
  } else if (req.session.auth.username === body.userName) {
    res.send({ auth: true, userName: body.userName, msg: 'وارد شدید' });
  }
});
AccountController.post('/upload', async (req: any, res) => {
  const file = req.files;
  const { body } = req;
  console.log(file);

  if (body.name.length === 0 || body.cate.length === 0
    || body.desc.length === 0 || file.length === 0) {
    // console.log('file name is null');
    res.send({ auth: true, msg: 'لطفا تمام فیلد‌ها را وارد کنید', status: 'err' });
  } else {
    const newPost = new Post({
      title: body.name,
      category: body.cate,
      description: body.desc,
      banner: body.banner,
      bannerPath: body.bannerPath,
    });

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
          console.log(`[ ${chalk.green('DB')} ${chalk.red('Error')} ]`);
          console.log(err.errmsg);
          if (err.code === 2) {
            Overview.find({},
              (Err, doc: any) => {
                if (Err) {
                  return console.log(Err);
                }
                console.log(`[ ${chalk.blue('info')} ] collection with ID ${chalk.blue.underline(doc[0]._id)} found`);

                const id = doc[0]._id;

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
                  (ERr, Doc) => {
                    if (ERr) return console.log(ERr);
                    console.log(`[ ${chalk.blue('info')} ] DB Update`);
                    return console.log(Doc);
                  },
                );
              });
          } else {
            return console.log(err);
          }
        }
        return console.log(d);
      });
    await newPost.save(async (err, post:any) => {
      if (err) return loger('error', err);
      const imageFiles: any = [];
      file.map(async (d:{path:string, mimetype:any}) => {
        const img = fs.readFileSync(d.path);
        const EncodeImg = img.toString('base64');
        const FinalImg = {
          contentType: d.mimetype,
          // eslint-disable-next-line new-cap
          image: new Buffer.from(EncodeImg, 'base64'),
        };
        await imageFiles.push(FinalImg);
      });
      const newImg = new Img({
        postID: post._id,
        image: imageFiles,
        banner: post.banner,
        bannerPath: post.bannerPath,
      });
      await newImg.save();
      return loger('info', post);
    });

    res.send({
      msg: 'ثبت شد',
      auth: true,
      imgPath: file.path,
      status: 'ok',
    });
  }
});

AccountController.post('/production', async (req, res) => {
  const { target } = req.body;
  Post.find({ category: target }, ((postErr, posts) => {
    if (postErr) return loger('error', postErr);
    const finalImg:any = [];
    posts.map((post) => Img.find({ postID: post._id }, (imgErr, imgs:any) => {
      if (imgErr) return loger('error', imgErr);
      return imgs.map((img:any) => finalImg.push(img.image[0].image));
    }));

    return res.send(finalImg);
  }));
  // Post.find({ category: target }).then(
  //   async (resualt) => {
  //     const images:any = [];
  //     await resualt.map(async (d) => {
  //       Img.find({ postID: d._id }).then(
  //         async (img: any) => {
  //           await img.map((doc: any) => images.push(doc.image[0].image));
  //           return res.send({ resualt, images });
  //         },
  //       ).catch((err) => {
  //         res.send('err');
  //         console.log(`${err}line 1`);
  //       });
  //     });
  //   },
  // ).catch((err) => {
  //   console.log(`${err}line 2`);
  // });
});
AccountController.post('/product', async (req, res) => {
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
            Overview.updateOne(
              { name: 'overview' },
              { $inc: { totalView: 1 } },
              (Err, D) => {
                if (Err) return loger('error', err);
                return loger('info', D);
              },
            );
          }
          return loger('info', d);
        },
      );
      loger('info', resualt);
      res.send(resualt);
    },
  );
});

AccountController.post('/banner', (_req, res) => {
  Post.find({ banner: true }).then(
    async (resualt) => {
      await Img.find({ banner: true }).then((docs) => {
        const d:any = [];
        docs.map((data:any) => d.push(data.image[data.bannerPath]));
        const finalRes = {
          banners: d,
          bannerInfo: resualt,
        };
        res.send(finalRes);
      });
    },
  );
});

AccountController.post('/overview', (_req, res) => {
  Overview.findOne({}).then(
    (resualt) => {
      res.send(resualt);
    },
  );
});

AccountController.get('/all', (_req, res) => {
  Post.find({}).then((resualt:any) => {
    res.send(resualt);
  });
});
AccountController.post('/test', (req, res) => {
  const { files }:any = req.files;

  const fileContents = fs.createReadStream('./server/api/1wd.jpg');
  console.log(req.body);

  liaraClient.putObject('images', 'rahati/test1/hello-file.jpg', fileContents).then((result:any) => {
    console.log('Successfully uploaded.');
    res.send(result);
  });
  // liaraClient.makeBucket('test1', (err:any) => {
  //   if (err) return console.log(err);
  //   return console.log('ok');
  // });
  // liaraClient.listBuckets((err:any, buckets:any) => {
  //   if (err) return console.log(err);
  //   console.log('buckets :', buckets);
  // });
  // liaraClient.presignedUrl('GET', 'images', 'hello-file.jpg', 24 * 60 * 60, (err:any, doc:any) => {
  //   if (err) {
  //     return res.send(err);
  //   }
  //   // doc.on('data', (d:any) => {
  //   //   console.log(d);
  //   // });
  //   return res.send(doc);
  // });
  console.log(files.name);
});


module.exports = [
  AccountController,
  PostController,
];
