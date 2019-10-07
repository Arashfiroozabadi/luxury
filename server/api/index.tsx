import express from 'express';
import multer from 'multer';
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
    destination: function (_req: any, _file: any, cb) {
        cb(null, 'static/uploads')
    },
    filename: function (_req: any, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
AccountController.post('/auth', (req: any, res) => {
    console.log(req.session);
    if (req.session.auth) {
        res.send({ auth: true, test: req.session.auth, msg: 'وارد شدید' })
    } else {
        res.send({ auth: false })
    }
})
AccountController.post('/upload', upload.single('file'), (req: any, res) => {
    const body = req.body.form

    if (body.userName.length <= 0) {
        res.send({ auth: false, msg: "نام کاربری را وارد کنید" })
    } else if (body.pass.length <= 0) {
        res.send({ auth: false, msg: "رمز عبور را وارد کنید" })
    } else {
        if (req.session.auth == undefined) {
            User.findOne({ userName: body.userName, pass: body.pass }).then(
                (resualt: any) => {
                    if (resualt === null) {
                        res.send({ auth: false, msg: 'نام کاربری و یا رمز عبور اشتباه است' })
                    } else {
                        req.session.auth = { username: body.userName };
                        res.send({ auth: true, userName: resualt.userName, msg: 'وارد شدید' })
                    }
                }
            )
        }
    }

    // req.session!.auth = { username : req.body['username'] } ;
    // const file = req.file
    // console.log(req.body);

    // const newPhoto = new PhotoModel({
    //     title: file.filename,
    //     path: file.path,
    // })
    // newPhoto.save();
    // res.send(file.path)
    // if (req.body.name === 'arash') {

    //     const body = req.body
    //     User.findOne({ userName: body.name }).then(
    //         (resualt: any) => {
    //             console.log(resualt.userName);
    //             res.send(resualt)
    //         }
    //     )
    // }
})

export default AccountController