import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Save feedback
router.post('/', async (req, res) => {
  try {
    const { emoji, label, comment } = req.body;
    const newFeedback = new Feedback({ emoji, label, comment });
    await newFeedback.save();
    res.status(201).json({ success: true, message: 'Feedback saved successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving feedback' });
  }
});

export default router;