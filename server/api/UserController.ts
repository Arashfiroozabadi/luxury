/* eslint-disable consistent-return */
import express from 'express';

import Loger from '../components/logers';
import { User } from '../models';


const UserController = express.Router();


UserController.post('/login', async (req:any, res) => {
  const { userName, pass } = await req.body.form;

  await User.findOne({ userName }, async (errFind, user:any) => {
    if (errFind) {
      console.log(errFind);
      res.status(500).json({ auth: false, msg: 'server err' });
    }
    if (user === null) {
      res.status(404).json({ auth: false, msg: 'کاربر یافت نشد' });
    } else {
      user.comparePassword(pass, (errMatchPass:any, isMatch:boolean) => {
        if (errMatchPass) {
          Loger('error', errMatchPass);
          res.status(500).json({ auth: false, msg: 'server err' });
        }
        if (isMatch) {
          req.session.auth = { username: user.userName };
          res.send({ auth: isMatch, userName: user.userName, msg: 'شما با موفقیت وارد شدید' });
        } else {
          res.status(404).json({ auth: isMatch, msg: 'رمز ورود اشتباه است' });
        }
      });
    }
  });
  //   const newUser = new User({
  //     userName: name,
  //     password: pass,
  //     type: 'admin',
  //   });

  //   newUser.save().then((doc) => {
  //     console.log(doc);
  //   });
});


UserController.post('/auth', (req: any, res) => {
  if (req.session.auth) {
    res.send({ auth: true, user: req.session.auth, msg: 'وارد شدید' });
  } else {
    res.status(401).json({ auth: false });
  }
});


module.exports = UserController;
