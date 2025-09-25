const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
// GET /api/cart
// Return all carts (dev/admin). WARNING: do NOT expose this in production without auth.
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().lean();
    res.json({ total: carts.length, carts });
  } catch (err) {
    console.error('GET /api/cart error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    let cart = await Cart.findOne({ userId }).lean();
    if (!cart) {
      cart = { userId, items: [] };
    }
    res.json(cart);
  } catch (err) {
    console.error('GET /api/cart/:userId error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:userId/items', async (req, res) => {
  try {
    const userId = req.params.userId;
    const item = req.body;
    if (!item || !item.title) return res.status(400).json({ error: 'item.title required' });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [ { ...item, quantity: item.quantity || 1 } ] });
    } else {
      const existing = cart.items.find(i => i.title === item.title);
      if (existing) {
        existing.quantity = (existing.quantity || 0) + (item.quantity || 1);
      } else {
        cart.items.push({ ...item, quantity: item.quantity || 1 });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error('POST /api/cart/:userId/items error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:userId/items', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, change, quantity } = req.body;
    if (!title) return res.status(400).json({ error: 'title required' });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const item = cart.items.find(i => i.title === title);
    if (!item) return res.status(404).json({ error: 'Item not found in cart' });

    if (typeof quantity === 'number') {
      item.quantity = Math.max(0, Math.floor(quantity));
    } else if (typeof change === 'number') {
      item.quantity = Math.max(0, (item.quantity || 0) + Math.floor(change));
    } else {
      return res.status(400).json({ error: 'quantity or change required' });
    }

     cart.items = cart.items.filter(i => i.quantity > 0);
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error('PATCH /api/cart/:userId/items error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:userId/items', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'title required' });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(i => i.title !== title);
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error('DELETE /api/cart/:userId/items error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    await Cart.findOneAndDelete({ userId });
    res.json({ ok: true });
  } catch (err) {
    console.error('DELETE /api/cart/:userId error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
