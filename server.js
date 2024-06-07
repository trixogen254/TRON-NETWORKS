const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const MikroNode = require('mikronode');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');

console.log('Allowed Origins:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware to log requests for debugging
app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  console.log('Request Method:', req.method);
  console.log('Request Headers:', req.headers);
  next();
});

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// User registration
app.post('/register', async (req, res) => {
  const { username, password, email, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, hashedPassword, email, phone], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('User registered successfully');
  });
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('User not found');

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid credentials');

    res.send('User logged in successfully');
  });
});

// Get Packages
app.get('/api/packages', (req, res) => {
  const sql = 'SELECT * FROM Packages';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Payment processing
app.post('/api/pay', async (req, res) => {
  const { userId, packageId, mpesaNumber } = req.body;

  // Mock M-Pesa payment process
  const paymentStatus = 'success'; // Assume payment is successful for this example

  const sql = 'INSERT INTO transactions (user_id, package_id, payment_status) VALUES (?, ?, ?)';
  db.query(sql, [userId, packageId, paymentStatus], async (err, result) => {
    if (err) return res.status(500).send(err);

    // Activate package on MikroTik router
    await activatePackage(userId, packageId);

    res.send('Payment processed and package activated');
  });
});

// MikroTik router integration
const activatePackage = async (userId, packageId) => {
  // MikroTik router connection details
  const routerIp = '192.168.56.101'; // MikroTik router IP address
  const routerUsername = 'TRON'; // Router login username
  const routerPassword = 'Trixogen@24'; // Router login password

  const device = new MikroNode(routerIp);
  const connection = await device.connect(routerUsername, routerPassword);

  const chan = connection.openChannel();

  // Define the package profiles and durations
  const packageProfiles = {
    1: { profile: 'quick_browsing', duration: '00:05:00' },
    2: { profile: 'one_hour', duration: '01:00:00' },
    3: { profile: 'one_day', duration: '24:00:00' },
    4: { profile: 'three_days', duration: '72:00:00' },
    5: { profile: 'one_week', duration: '168:00:00' },
    6: { profile: 'one_month', duration: '720:00:00' }
  };

  const { profile, duration } = packageProfiles[packageId];

  // Add user to the MikroTik router with the package profile and limit uptime
  chan.write([
    '/ip/hotspot/user/add',
    `=name=user${userId}`,
    `=profile=${profile}`,
    `=limit-uptime=${duration}`
  ]);

  const [response] = await chan.read();
  console.log(response);

  connection.close();
};

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
