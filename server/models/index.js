import mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema;

const overview = new Schema({
  name: { type: String, default: 'overview' },
  total: { type: Number, default: 0 },
  category: [{ name: String, value: Number }],
  totalView: { type: Number, default: 0 },
});

const photoModel = new Schema({
  author: ObjectId,
  title: { type: String },
  color: [{ colorName: String, imgPath: String }],
  path: { type: Array },
  views: { type: Array },
  unit: { type: String },
  category: { type: String },
  description: { type: String },
  banner: { type: Boolean },
  bannerPath: { type: String },
  date: { type: Date, default: Date.now },
});

const user = new Schema({
  author: ObjectId,
  userName: { type: String, unique: true, required: true },
  pass: { type: String },
  type: { text: String },
  date: { type: Date, default: Date.now },
});
user.requiredPaths();

export const User = mongoose.model('users', user);
export const Overview = mongoose.model('overview', overview);
export const PhotoModel = mongoose.model('photos', photoModel);
