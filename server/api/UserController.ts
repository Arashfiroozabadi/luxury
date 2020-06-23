/* eslint-disable consistent-return */
import express from 'express';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import Loger from '../components/logers';
import { User } from '../models';
import { auth } from '../middleware';

const UserController = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'arashfiroozabadi29@gmail.com',
    pass: 'arash688',
  },
});

UserController.post('/login', async (req:any, res:any) => {
  Loger('warn', process.env.PORT);
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

            jwt.sign(payLoad, `${key}`, { expiresIn: 10000 }, async (errToken, token) => {
              if (errToken) throw errToken;
              // req.session.auth = { username: user.userName };
              await res.send({
                auth: isMatch,
                userName: user.userName,
                token,
                type: user.type,
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

interface signinProp{
  body:{
    userName:string
    token:string
  }
}

UserController.post('/signin', async (req:signinProp, res) => {
  const { userName, token } = req.body;
  const key = process.env.tokenKey;

  const user = await User.findOne({ userName });

  if (user) {
    return res.status(409).json({ msg: 'user already exists' });
  }

  if (token) {
    try {
      const decoded:any = jwt.verify(token, `${key}`);
      return res.send({ decoded, token });
    } catch (error) {
      res.send({ msg: 'token expire. try to get new token with email', error });
    }
  } else {
    const randomNum = Math.floor((Math.random() * 1000000) + 1);
    const payLoad = {
      restToken: randomNum,
    };

    jwt.sign(payLoad, `${key}`, { expiresIn: 10000 }, async (errToken, newToken) => {
      if (errToken) throw errToken;

      const mailOptions = {
        from: 'arashfiroozabadi29@gmail.com',
        to: 'arashfiroozabadii@gmail.com',
        subject: 'Sending Email using Node.js',
        html: `<h1>${newToken}<h1/>`,
      };
      transporter.sendMail(mailOptions, (emailerror, info) => {
        if (emailerror) {
          console.log(emailerror);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });

      res.send({ msg: 'pls send token in your email' });
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

UserController.get('/logout', auth, async (req:any, res) => {
  const payLoad = {
    user: { id: req.user.id },
  };
  try {
    const key = process.env.token;
    jwt.sign(payLoad, `${key}`, { expiresIn: 1 }, async (errToken, token) => {
      if (errToken) throw errToken;
      await res.send({
        auth: false,
        userName: 'none',
        token,
        type: 'none',
        msg: 'شما با موفقیت خارج شدید',
      });
    });
  } catch (e) {
    res.send({ message: 'Error in Fetching user' });
  }
});


module.exports = UserController;
