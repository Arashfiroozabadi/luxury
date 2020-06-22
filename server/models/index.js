/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const img = new Schema({
  postID: String,
  image: Array,
  banner: { type: Boolean },
  bannerPath: { type: Number },
});
const post = new Schema({
  author: ObjectId,
  title: { type: String },
  color: [{ colorName: String, imgPath: String }],
  views: { type: Array },
  unit: { type: String },
  category: { type: String },
  description: { type: String },
  banner: { type: Boolean },
  bannerPath: { type: Number },
  imagePath: Array,
  date: { type: Date, default: Date.now },
});

const overview = new Schema({
  name: { type: String, default: 'overview' },
  total: { type: Number, default: 0 },
  category: [{ name: String, value: Number, view: Number }],
  totalView: { type: Number, default: 0 },
});

const user = new Schema({
  author: ObjectId,
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: { type: String },
  date: { type: Date, default: Date.now },
});
user.requiredPaths();

user.pre('save', function (next) {
  console.log('Pre-Save Hash has fired.');
  const userdoc = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error(err);
    bcrypt.hash(userdoc.password, salt, (err, hash) => {
      userdoc.password = hash;
      next();
    });
  });
});

user.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export const User = mongoose.model('users', user);
export const Overview = mongoose.model('overview', overview);
export const Post = mongoose.model('post', post);
export const Img = mongoose.model('img', img);
