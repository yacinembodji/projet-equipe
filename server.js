import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Path to the JSON file
const dbPath = path.join(__dirname, 'src', 'Admin', 'db.json');

// Helper function to read the database
function readDB() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

// Helper function to write to the database
function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Routes for users
app.get('/users', (req, res) => {
  const db = readDB();
  res.json(db.users);
});

app.get('/users/:id', (req, res) => {
  const db = readDB();
  const user = db.users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.post('/users', (req, res) => {
  const db = readDB();
  // Vérifier si l'email existe déjà
  const existingUser = db.users.find(u => u.email === req.body.email);
  if (existingUser) {
    return res.status(400).json({ error: "Email déjà utilisé" });
  }
  const newUser = { id: Date.now().toString(), ...req.body };
  db.users.push(newUser);
  writeDB(db);
  res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...req.body };
    writeDB(db);
    res.json(db.users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.patch('/users/:id', (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    db.users[index] = { ...db.users[index], ...req.body };
    writeDB(db);
    res.json(db.users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/users/:id', (req, res) => {
  const db = readDB();
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    db.users.splice(index, 1);
    writeDB(db);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Routes for products
app.get('/products', (req, res) => {
  const db = readDB();
  res.json(db.products);
});

app.get('/products/:id', (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/products', (req, res) => {
  const db = readDB();
  const newProduct = { id: Date.now().toString(), ...req.body };
  db.products.push(newProduct);
  writeDB(db);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const db = readDB();
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    db.products[index] = { ...db.products[index], ...req.body };
    writeDB(db);
    res.json(db.products[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/products/:id', (req, res) => {
  const db = readDB();
  const index = db.products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    db.products.splice(index, 1);
    writeDB(db);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Routes for commands
app.get('/commandes', (req, res) => {
  const db = readDB();
  const { clientId } = req.query;
  if (clientId) {
    const commands = db.commandes.filter(c => c.clientId === clientId);
    res.json(commands);
  } else {
    res.json(db.commandes);
  }
});

app.get('/commandes/:id', (req, res) => {
  const db = readDB();
  const command = db.commandes.find(c => c.id === req.params.id);
  if (command) {
    res.json(command);
  } else {
    res.status(404).json({ error: 'Command not found' });
  }
});

app.post('/commandes', (req, res) => {
  const db = readDB();
  const newCommand = { id: Date.now().toString(), ...req.body };
  db.commandes.push(newCommand);
  writeDB(db);
  res.status(201).json(newCommand);
});

app.put('/commandes/:id', (req, res) => {
  const db = readDB();
  const index = db.commandes.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    db.commandes[index] = { ...db.commandes[index], ...req.body };
    writeDB(db);
    res.json(db.commandes[index]);
  } else {
    res.status(404).json({ error: 'Command not found' });
  }
});

app.delete('/commandes/:id', (req, res) => {
  const db = readDB();
  const index = db.commandes.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    db.commandes.splice(index, 1);
    writeDB(db);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Command not found' });
  }
});

// Route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  res.json({ fileUrl, filename: req.file.filename });
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
