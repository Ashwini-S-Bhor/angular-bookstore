const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  image: String,
  category: String
}, { _id: false });

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true, unique: true }, // identify cart by userId
  items: [CartItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);
