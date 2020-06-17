/* eslint-disable consistent-return */
import express from 'express';
import jwt from 'jsonwebtoken';
import Loger from '../components/logers';
import { User } from '../models';
import { auth } from '../middleware';

const UserController = express.Router();


UserController.post('/login', async (req:any, res:any) => {
  const { userName, password } = await req.body.form;
  if (userName.length === 0 || password.length <= 3) {
    res.status(400).json({ auth: false, msg: 'نام کاربری یا رمز ورود اشتباه است' });
  } else {
    await User.findOne({ userName }, async (errFind, user:any) => {
      if (errFind) {
        Loger('error', errFind.message);
        res.status(500).json({ auth: false, msg: 'server err' });
      }
      if (user === null) {
        res.status(404).json({ auth: false, msg: 'کاربر یافت نشد' });
      } else {
        user.comparePassword(password, (errMatchPass:any, isMatch:boolean) => {
          if (errMatchPass) {
            Loger('error', errMatchPass);
            res.status(500).json({ auth: false, msg: 'server err' });
          }
          if (isMatch) {
            const payLoad = {
              user: { id: user._id },
            };
            const key = process.env.token;

            jwt.sign(payLoad, `${key}`, { expiresIn: 10000 }, (errToken, token) => {
              if (errToken) throw errToken;
              // req.session.auth = { username: user.userName };
              res.send({
                auth: isMatch,
                userName: user.userName,
                token,
                msg: 'شما با موفقیت وارد شدید',
              });
            });
          } else {
            res.status(404).json({ auth: isMatch, msg: 'رمز ورود اشتباه است' });
          }
        });
      }
    });
  }
});

UserController.get('/admininfo', auth, async (req:any, res) => {
  try {
    await User.findById(req.user.id).then((userDoc:any) => {
      res.send({
        userName: userDoc.userName,
        type: userDoc.type,
        auth: true,
        msg: 'احراز هویت انجام شد',
      });
    }).catch((e) => {
      res.status(500).json({ msg: 'server err', e });
      Loger('error', e);
    });
  } catch (error) {
    res.status(401).json({ msg: 'احراز هویت انجام نشد' });
  }
});

UserController.get('/me', auth, async (req:any, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error in Fetching user' });
  }
});


module.exports = UserController;
