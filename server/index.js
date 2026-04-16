import express from 'express';
import cors from 'cors';
import {
  getArtists,
  getGenres,
  getSongs,
  getTypes
} from './data-provider.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/api/artists', async (req, res) => {
  try {
    const data = await getArtists();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load artists' });
  }
});

app.get('/api/genres', async (req, res) => {
  try {
    const data = await getGenres();
    res.json(data);
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load genres' });
  }
});

app.get('/api/songs', async (req, res) => {
  try {
    const data = await getSongs();
    res.json(data);
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load songs' });
  }
});

app.get('/api/types', async (req, res) => {
  try {
    const data = await getTypes();
    res.json(data);
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: 'Failed to load types' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});