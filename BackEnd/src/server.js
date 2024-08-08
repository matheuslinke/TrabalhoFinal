const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

// Configurações
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_secret_key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Inicialização do banco de dados
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT)");
  db.run("CREATE TABLE table1 (id INTEGER PRIMARY KEY, column1 TEXT, column2 TEXT)");
  db.run("CREATE TABLE table2 (id INTEGER PRIMARY KEY, column1 TEXT, column2 TEXT)");
});

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Controladores de autenticação
app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], function(err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid password' });
    }
  });
});

// Controladores para Table1
app.get('/table1', authenticateToken, (req, res) => {
  db.all("SELECT * FROM table1", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/table1', authenticateToken, (req, res) => {
  const { column1, column2 } = req.body;
  db.run("INSERT INTO table1 (column1, column2) VALUES (?, ?)", [column1, column2], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

app.put('/table1/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { column1, column2 } = req.body;
  db.run("UPDATE table1 SET column1 = ?, column2 = ? WHERE id = ?", [column1, column2, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

app.delete('/table1/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM table1 WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// Controladores para Table2
app.get('/table2', authenticateToken, (req, res) => {
  db.all("SELECT * FROM table2", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/table2', authenticateToken, (req, res) => {
  const { column1, column2 } = req.body;
  db.run("INSERT INTO table2 (column1, column2) VALUES (?, ?)", [column1, column2], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

app.put('/table2/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { column1, column2 } = req.body;
  db.run("UPDATE table2 SET column1 = ?, column2 = ? WHERE id = ?", [column1, column2, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

app.delete('/table2/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM table2 WHERE id = ?", [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
