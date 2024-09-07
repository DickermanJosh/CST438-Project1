import * as SQLite from 'expo-sqlite/legacy';

// Open the SQLite database or create it if it doesn't exist
const db = SQLite.openDatabase('pokemon.db');

export { db };
