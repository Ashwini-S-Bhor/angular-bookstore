const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Book = require('../models/book');

router.get('/', async (req, res) => {
  try {
    const page = Math.max(0, parseInt(req.query.page || '0', 10));
    const limit = Math.max(1, parseInt(req.query.limit || '10', 10));
    const search = (req.query.search || '').trim();
    const category = (req.query.category || '').trim();

    const filter = {};
    if (category) filter.category = { $regex: new RegExp('^' + category + '$', 'i') };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .exec();

    res.json({ page, limit, total, books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/books/:slug
router.get('/:slug', async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/categories
router.get('/meta/categories/list', async (req, res) => {
  try {
    const categories = await Book.distinct('category');
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/books - add book (you can protect this later)
router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.title) return res.status(400).json({ error: 'title required' });

    const slug = slugify(payload.title, { lower: true, strict: true });
    const book = new (require('../models/book'))({ ...payload, slug });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/books/:id - update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
