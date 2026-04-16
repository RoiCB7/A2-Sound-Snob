import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanRowKeys(row) {
  const cleanedRow = {};

  for (const key in row) {
    const cleanedKey = key.replace(/^\ufeff/, '').trim();
    cleanedRow[cleanedKey] = row[key];
  }

  return cleanedRow;
}

function readCSV(filename) {
  return new Promise((resolve, reject) => {
    const results = [];
    const filePath = path.join(__dirname, 'data', filename);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(cleanRowKeys(data));
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

export async function getArtists() {
  return await readCSV('artists.csv');
}

export async function getGenres() {
  return await readCSV('genres.csv');
}

export async function getSongs() {
  return await readCSV('songs.csv');
}

export async function getTypes() {
  return await readCSV('types.csv');
}