const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

// 1. POPRAWKA CORS: Podaj DOKŁADNY adres swojej aplikacji klienckiej (z Vercel/Render)
app.use(cors({
  origin: 'https://pokedexab.vercel.app' // <-- ZMIEŃ NA SWÓJ PRAWDZIWY LINK FRONTENDU!
}));
app.use(express.json());

// 2. POPRAWKA SSL: Aiven wymaga tego do bezpiecznego połączenia
const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get('/api/pokemons', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pokemon');
    res.json(rows);
  } catch (error) {
    console.error("Błąd GET /api/pokemons:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/pokemons', async (req, res) => {
  const { name, imageUrl, description, type, hp, attack, defense } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO pokemon (name, imageUrl, description, type, hp, attack, defense) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, imageUrl, description, type, hp || 50, attack || 50, defense || 50]
    );
    res.json({ id: result.insertId, message: "Pokemon dodany pomyślnie!" });
  } catch (error) {
    console.error("Błąd bazy danych:", error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/pokemons/:id', async (req, res) => {
  const { name, imageUrl, description, type, hp, attack, defense } = req.body;
  try {
    await pool.query(
      'UPDATE pokemon SET name=?, imageUrl=?, description=?, type=?, hp=?, attack=?, defense=? WHERE id=?',
      [name, imageUrl, description, type, hp, attack, defense, req.params.id]
    );
    res.json({ message: "Pokemon zaktualizowany!" });
  } catch (error) {
    console.error("Błąd aktualizacji:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/pokemons/:id', async (req, res) => {
  try {
    await pool.query('DELETE  pokemon WHERE id = ?', [req.params.id]);
    res.json({ message: "Pokemon usunięty!" });
  } catch (error) {
    console.error("Błąd usuwania:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pokemons/:id/neighbors', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [[prev]] = await pool.query('SELECT id, name  pokemon WHERE id < ? ORDER BY id DESC LIMIT 1', [id]);
    const [[next]] = await pool.query('SELECT id, name  pokemon WHERE id > ? ORDER BY id ASC LIMIT 1', [id]);
    res.json({ prev: prev || null, next: next || null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/pokemons/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT *  pokemon WHERE id = ?', [req.params.id]);
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).json({ error: "Nie ma takiego Pokemona" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. POPRAWKA PORTU DLA RENDERA
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Serwer API działa na porcie ${PORT}`));
