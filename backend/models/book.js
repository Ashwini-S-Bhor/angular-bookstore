const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: String,
  comment: String,
  rating: Number
}, { _id: false });

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  author: String,
  image: String,
  category: String,
  rating: Number,
  price: Number,
  discount: Number,
  stock: Number,
  description: String,
  language: String,
  year: Number,
  reviews: [ReviewSchema],
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
