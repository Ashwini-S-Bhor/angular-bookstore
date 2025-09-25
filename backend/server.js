require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: ['https://bookstore-angular.netlify.app'],
  credentials: true
}));
app.use(express.json());


app.get('/', (req, res) => res.send('Backend is running 🚀'));


const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);
const cartRouter = require('./routes/cart');
app.use('/api/cart', cartRouter);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://ashwinishinde9605_db_user:NMlL7ThIJ71etweU@cluster0.sdaeaqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connection error', err);
    process.exit(1);
  });
