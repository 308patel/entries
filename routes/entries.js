const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// GET — Show all entries + grand total
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    const grandTotal = entries.reduce((sum, e) => sum + e.total, 0);
    res.render('index', { entries, grandTotal, error: null, success: null });
  } catch (err) {
    res.render('index', { entries: [], grandTotal: 0, error: 'Failed to load entries.', success: null });
  }
});

// POST — Add new entry (no user-entered total; auto-calculated)
router.post('/add', async (req, res) => {
  try {
    const no = parseInt(req.body.no);
    if (!no || no <= 0 || isNaN(no)) {
      const entries = await Entry.find().sort({ createdAt: -1 });
      const grandTotal = entries.reduce((sum, e) => sum + e.total, 0);
      return res.render('index', { entries, grandTotal, error: 'Please enter a valid positive number.', success: null });
    }

    const entry = new Entry({ no, total: no * 108 });
    await entry.save();

    res.redirect('/');
  } catch (err) {
    const entries = await Entry.find().sort({ createdAt: -1 });
    const grandTotal = entries.reduce((sum, e) => sum + e.total, 0);
    res.render('index', { entries, grandTotal, error: 'Error saving entry.', success: null });
  }
});

// DELETE — Remove an entry
router.post('/delete/:id', async (req, res) => {
  try {
    await Entry.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

// DELETE ALL — Clear all entries
router.post('/clear', async (req, res) => {
  try {
    await Entry.deleteMany({});
    res.redirect('/');
  } catch (err) {
    res.redirect('/');
  }
});

module.exports = router;
