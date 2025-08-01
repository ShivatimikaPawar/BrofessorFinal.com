import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  emoji: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Feedback', feedbackSchema);