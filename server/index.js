const express = require('express');
const mongoose = require('mongoose');
const Card = require('./models/cardModel');
const cors = require('cors');
const app = express();
const port = 8001;
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/helpcenter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


app.post('/cards', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newCard = new Card({ title, description });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: 'Error creating card' });
  }
});


app.post('/getcards', async (req, res) => {
  const { title } = req.body;

  try {
    if (!title) {
    
      const cards = await Card.find();
      return res.json(cards);
    } else {
     
      const card = await Card.findOne({ title: { $regex: new RegExp(`^${title}$`, 'i') } });
      
      if (!card) {
        return res.status(404).json({ error: 'Card not found' });
      }
      return res.json(card);
    }
  } catch (error) {
    console.error('Error retrieving card(s):', error);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
