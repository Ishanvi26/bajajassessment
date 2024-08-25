const express = require('express');
const app = express();

app.use(express.json());

// POST method: /bfhl
app.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
  const highestLowercaseAlphabet = lowercaseAlphabets.sort().slice(-1);

  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
  });
});

// GET method: /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Export the app as a serverless function
module.exports = app;