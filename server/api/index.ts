import express from 'express';
import fs from 'fs';


const Liara = require('@liara/sdk');

const PostController = require('./PostController');
const UploadController = require('./UploadController');
const Banner = require('./banner');
const Production = require('./production');
const AllProducts = require('./AllProducts');
const Search = require('./Search');
const UserController = require('./UserController');
const DashBoard = require('./DashBoard');

const AccountController = express.Router();

const liaraClient = new Liara.Storage.Client({
  accessKey: 'Z3SBHOIW4DM5VL9YTHRJF',
  secretKey: 'ejoUJJEe4yqkUYFohJZtYprSxWSqT8wC9Thv9AOBQ',
  endPoint: '5ed778ad1c92cc0011b11ead.liara.space',
});


AccountController.post('/test', (req, res) => {
  const { files }:any = req.files;

  const fileContents = fs.createReadStream('./server/api/1wd.jpg');
  console.log(req.body);

  liaraClient.putObject('images', 'rahati/test1/hello-file.jpg', fileContents).then((result:any) => {
    console.log('Successfully uploaded.');
    res.send(result);
  });
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
  UserController,
  DashBoard,
];
