import express from 'express';
import multer from 'multer';
import mkdirp from 'mkdirp';
import {
    User,
    PhotoModel,
    Overview
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
    destination: function (req: any, _files: any, cb) {
        const dest = `static/uploads/${req.body.cate}/${req.body.name}`
        mkdirp.sync(`public/${dest}`);
        cb(null, `public/${dest}`)
    },
    filename: function (_req: any, file, cb) {
        cb(null, file.originalname)
        // console.log(file);
    }
})
function filters(req: any, file: any, cb: any) {
    // const files = req.files

    if (req.body.name.length === 0 || req.body.cate.length === 0 || req.body.desc.length === 0 || file === undefined) {
        cb("لطفا تمام فیلد‌ها را وارد کنید", false)
    }
    if (file.mimetype !== 'image/jpeg') {
        cb('file type not allow', false)
    }
    cb(null, true)
}
const upload = multer({
    storage: storage,
    fileFilter: filters
})

AccountController.post('/auth', (req: any, res) => {

    if (req.session.auth) {
        res.send({ auth: true, test: req.session.auth, msg: 'وارد شدید' })
    } else {
        res.send({ auth: false })
    }
})

AccountController.post('/login', upload.single('file'), (req: any, res) => {
    const body = req.body.form

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
AccountController.post('/upload', upload.array('file', 7), (req: any, res) => {
    const file = req.files;
    const body = req.body;

    if (body.name.length === 0 || body.cate.length === 0 || body.desc.length === 0 || file.length === 0) {
        // console.log('file name is null');
        res.send({ auth: true, msg: 'لطفا تمام فیلد‌ها را وارد کنید', status: 'err' })

    } else {
        let path: any = []
        file.map((d: any) => {
            path.push(d.path.replace(/public\\/g, ''))
        })
        const newPhoto = new PhotoModel({
            title: body.name,
            category: body.cate,
            description: body.desc,
            path: path,
            banner: body.banner,
            bannerPath: body.bannerPath
        })

        Overview.updateOne({ "category.name": body.cate },
            {
                $inc: {
                    total: 1,
                    "category.$.value": 1
                }
            },
            { upsert: true },
            (err, d) => {
                if (err) {
                    console.log(err);

                    if (err.code === 2) {
                        Overview.find({},
                            (err, doc: any) => {
                                if (err) {
                                    return console.log(err)
                                } else {
                                    console.log(doc);

                                    const id = doc[0]._id
                                    console.log(id);

                                    Overview.updateOne(
                                        { "_id": id },
                                        {
                                            $inc: {
                                                total: 1
                                            },
                                            $push: {
                                                "category": { 'name': body.cate, 'value': 1 }
                                            }
                                        },
                                        (err, doc) => {
                                            if (err) return console.log(err)
                                            console.log(doc)
                                        }
                                    )
                                }
                            }
                        )
                    } else {
                        return console.log(err);
                    }
                }
                else {
                    return console.log(d);
                }
            }
        );
        newPhoto.save();
        res.send({
            msg: "ثبت شد",
            auth: true,
            imgPath: file.path,
            status: 'ok'
        });
    }
})

AccountController.post('/production', (req, res) => {
    const target = req.body.target
    PhotoModel.find({ category: target }).then(
        resualt => {
            res.send(resualt)
        }
    )
})
AccountController.post('/product', (req, res) => {
    const target = req.body.target

    PhotoModel.findOne({ _id: target }).then(
        (resualt: any) => {
            PhotoModel.updateOne(
                { "_id": target },
                { $addToSet: { "views": req.connection.remoteAddress } },
                (err, d) => {
                    if (err) return console.log(err);
                    else {
                        if (d.nModified === 0) {
                            return null
                        } else if (d.nModified === 1) {
                            Overview.updateOne(
                                { "name": "overview" },
                                { $inc: { totalView: 1 } },
                                (err, d) => {
                                    if (err) return console.log(err);
                                    else {
                                        return console.log(d);
                                    }
                                }
                            )
                        }
                        return console.log(d);
                    }
                }
            )
            res.send(resualt)
        }
    )
})

AccountController.post('/banner', (_req, res) => {
    PhotoModel.find({ banner: true }).then(
        resualt => {
            res.send(resualt)
        }
    )
})

AccountController.post('/overview', (_req, res) => {
    Overview.findOne({}).then(
        resualt => {
            res.send(resualt)
        }
    )
})

export default AccountController