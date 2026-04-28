const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool(process.env.DATABASE_URL);

// Pobieranie wszystkich - upewnij się, że tabela w Workbench nazywa się dokładnie 'Pokemon'
app.get('/api/pokemons', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Pokemon');
    res.json(rows);
  } catch (error) {
    console.error("Błąd GET /api/pokemons:", error);
    res.status(500).json({ error: error.message });
  }
});



// DODAWANIE - teraz z obsługą nowych kolumn
app.post('/api/pokemons', async (req, res) => {
  const { name, imageUrl, description, type, hp, attack, defense } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Pokemon (name, imageUrl, description, type, hp, attack, defense) VALUES (?, ?, ?, ?, ?, ?, ?)',
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
      'UPDATE Pokemon SET name=?, imageUrl=?, description=?, type=?, hp=?, attack=?, defense=? WHERE id=?',
      [name, imageUrl, description, type, hp, attack, defense, req.params.id]
    );
    res.json({ message: "Pokemon zaktualizowany!" });
  } catch (error) {
    console.error("Błąd aktualizacji:", error);
    res.status(500).json({ error: error.message });
  }
});

// USUWANIE Pokemona
app.delete('/api/pokemons/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Pokemon WHERE id = ?', [req.params.id]);
    res.json({ message: "Pokemon usunięty!" });
  } catch (error) {
    console.error("Błąd usuwania:", error);
    res.status(500).json({ error: error.message });
  }
});

// SĄSIEDZI (Do przycisków Poprzedni/Następny)
app.get('/api/pokemons/:id/neighbors', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // Szukamy najbliższego mniejszego ID (Poprzedni)
    const [[prev]] = await pool.query('SELECT id, name FROM Pokemon WHERE id < ? ORDER BY id DESC LIMIT 1', [id]);
    // Szukamy najbliższego większego ID (Następny)
    const [[next]] = await pool.query('SELECT id, name FROM Pokemon WHERE id > ? ORDER BY id ASC LIMIT 1', [id]);
    
    res.json({ prev: prev || null, next: next || null });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Pobieranie jednego po ID
app.get('/api/pokemons/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Pokemon WHERE id = ?', [req.params.id]);
    if (rows.length > 0) res.json(rows[0]);
    else res.status(404).json({ error: "Nie ma takiego Pokemona" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Serwer API działa na porcie 3000"));