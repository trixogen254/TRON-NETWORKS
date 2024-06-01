const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const packages = [
  { id: 1, name: 'Basic Package', price: 100.00, duration: 60 },
  { id: 2, name: 'Premium Package', price: 200.00, duration: 120 },
];

app.get('/packages', (req, res) => {
  res.json(packages);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
