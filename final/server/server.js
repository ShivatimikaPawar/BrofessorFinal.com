import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import taskRoutes from './routes/tasks.js';

const app = express();
const PORT = 5000;

// ===== Middleware =====
app.use(cors());
app.use(bodyParser.json()); // or app.use(express.json());

// ===== MongoDB Connection =====
mongoose.connect('mongodb://127.0.0.1:27017/brofessorDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error(err));

// ===== Feedback Schema & Route =====
const feedbackSchema = new mongoose.Schema({
  emoji: String,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/api/feedback', async (req, res) => {
  try {
    const { emoji, comment } = req.body;
    const feedback = new Feedback({ emoji, comment });
    await feedback.save();
    res.status(201).json({ message: 'Feedback saved!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== Task Routes =====
app.use('/api/tasks', taskRoutes);

// ===== Default route =====
app.get('/', (req, res) => {
  res.send('🚀 Brofessor Backend is Running!');
});

// ===== Start Server =====
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
