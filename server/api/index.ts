import express from 'express';
import multer from 'multer';
import mkdirp from 'mkdirp';
import fs from 'fs';

import loger from '../components/logers';
import {
  User,
  Overview,
  Post,
} from '../models';

const Liara = require('@liara/sdk');

const PostController = require('./PostController');
const UploadController = require('./UploadController');
const Banner = require('./banner');
const Production = require('./production');
const AllProducts = require('./AllProducts');
const Search = require('./Search');


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
    res.send({ auth: true, user: req.session.auth, msg: 'وارد شدید' });
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

AccountController.post('/overview', (_req, res) => {
  Overview.findOne({}).then(
    (resualt) => {
      res.send(resualt);
    },
  );
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
  UploadController,
  Banner,
  Production,
  AllProducts,
  Search,
];
