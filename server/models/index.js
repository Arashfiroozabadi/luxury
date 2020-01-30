import mongoose from 'mongoose';

const schema = mongoose.Schema
const ObjectId = schema.ObjectId;

const PhotoModel = new schema({
    author: ObjectId,
    title: { type: String },
    color: [{ colorName: String, imgPath: String }],
    path: { type: Array },
    unit: { type: String },
    category: { type: String },
    description: { type: String },
    banner: { type: Boolean },
    bannerPath: { type: String },
    date: { type: Date, default: Date.now },
})

const User = new schema({
    author: ObjectId,
    userName: { type: String, unique: true, required: true },
    pass: { type: String },
    type: { text: String },
    date: { type: Date, default: Date.now },
})
User.requiredPaths()

export const User = mongoose.model('users', User)

export const PhotoModel = mongoose.model('photos', PhotoModel)