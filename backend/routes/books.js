// routes/books.js
const express = require('express');
const router = express.Router();
const slugify = require('slugify');
const Book = require('../models/book');

// LIST: /api/books
router.get('/', async (req, res) => {
  try {
    const page = Math.max(0, parseInt(req.query.page || '0', 10));
    const limit = Math.max(1, parseInt(req.query.limit || '10', 10));
    const search = (req.query.search || '').trim();
    const category = (req.query.category || '').trim();

    const filter = {};
    if (category) {
      // match "contains", case-insensitive (Kids == kids == kids books)
      filter.category = { $regex: category, $options: 'i' };
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit);

    res.json({ page, limit, total, books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// META (put BEFORE param route): /api/books/meta/categories/list
router.get('/meta/categories/list', async (_req, res) => {
  try {
    const categories = await Book.distinct('category');
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DETAILS (id or slug): /api/books/:idOrSlug
router.get('/:idOrSlug', async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store');

    const { idOrSlug } = req.params;
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(idOrSlug);

    const book = isObjectId
      ? await Book.findById(idOrSlug)
      : await Book.findOne({ slug: idOrSlug });

    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE: /api/books
router.post('/', async (req, res) => {
  try {
    const payload = req.body || {};
    if (!payload.title) return res.status(400).json({ error: 'title required' });

    const slug = slugify(payload.title, { lower: true, strict: true });
    const book = new Book({ ...payload, slug });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(409).json({ error: 'Slug already exists' });
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE: /api/books/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Book not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE: /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
