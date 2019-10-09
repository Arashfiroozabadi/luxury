import express from 'express';
import multer from 'multer';
import mkdirp from 'mkdirp';
import {
    User,
    PhotoModel
} from '../models'

const AccountController = express.Router();


AccountController.get('/all', (_req, res) => {
    PhotoModel.find({}).then(
        resualt => {
            res.send(resualt)
        }
    )
})

var storage = multer.diskStorage({
    destination: function (req: any, _file: any, cb) {
        const dest = `static/uploads/${req.body.cate}`
        mkdirp.sync(dest);
        cb(null, dest)
    },
    filename: function (_req: any, file, cb) {
        cb(null, file.originalname)
        console.log(_req.body.name);

    }
})
var upload = multer({ storage: storage })
AccountController.post('/auth', (req: any, res) => {
    if (req.session.auth) {
        res.send({ auth: true, test: req.session.auth, msg: 'وارد شدید' })
    } else {
        res.send({ auth: false })
    }
})
AccountController.post('/login', upload.single('file'), (req: any, res) => {
    const body = req.body.form
    console.log(req.body);

    if (body.userName.length <= 0) {
        res.send({ msg: "نام کاربری را وارد کنید" })
    } else if (body.pass.length <= 0) {
        res.send({ msg: "رمز عبور را وارد کنید" })
    } else {
        if (req.session.auth == undefined) {
            User.findOne({ userName: body.userName, pass: body.pass }).then(
                (resualt: any) => {
                    if (resualt === null) {
                        res.send({ msg: 'نام کاربری و یا رمز عبور اشتباه است' })
                    } else {
                        req.session.auth = { username: body.userName };
                        res.send({ auth: true, userName: resualt.userName, msg: 'وارد شدید' })
                    }
                }
            )
        } else if (req.session.auth.username === body.userName) {
            res.send({ auth: true, userName: body.userName, msg: 'وارد شدید' })
        }
    }
})
AccountController.post('/upload', upload.single('file'), (req: any, res) => {

    const file = req.file;
    const body = req.body;

    if (body.name.length === 0 || body.cate.length === 0 || body.desc.length === 0) {
        console.log('file name is null');
        res.send({ auth: true, msg: 'لطفا تمام فیلد‌ها را وارد کنید', status: 'err' })
    } else {
        const newPhoto = new PhotoModel({
            title: body.name,
            category: body.cate,
            description: body.desc,
            path: file.path
        })
        newPhoto.save();

        res.send({
            msg: "ثبت شد",
            auth: true,
            imgPath: file.path,
            status: 'ok'
        });
    }
    console.log(
        typeof (body.name)
    );

    // res.send({ auth: true, imgPath: req.file.path })

    // if (body.userName.length <= 0) {
    //     res.send({ msg: "نام کاربری را وارد کنید" })
    // } else if (body.pass.length <= 0) {
    //     res.send({ msg: "رمز عبور را وارد کنید" })
    // } else {
    //     if (req.session.auth == undefined) {
    //         User.findOne({ userName: body.userName, pass: body.pass }).then(
    //             (resualt: any) => {
    //                 if (resualt === null) {
    //                     res.send({ msg: 'نام کاربری و یا رمز عبور اشتباه است' })
    //                 } else {
    //                     req.session.auth = { username: body.userName };
    //                     res.send({ auth: true, userName: resualt.userName, msg: 'وارد شدید' })
    //                 }
    //             }
    //         )
    //     } else if (req.session.auth.username === body.userName) {
    //         res.send({ auth: true, userName: body.userName, msg: 'وارد شدید' })
    //     }
    // }
})

export default AccountController