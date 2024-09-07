import * as SQLite from 'expo-sqlite/legacy';
import { db } from './db';

// Creates the user table if it does not yet exist
const createUserTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, team TEXT)',
        [],
        () => {
          console.log('Table created successfully');
          resolve(); // Resolve the promise when the table is created
        },
        (tx, error) => {
          console.log('Error creating table', error);
          reject(error); // Reject the promise on error
        }
      );
    });
  });
};

// Return a list of all the users in the user table
const listAllUsers = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM user',
        [],
        (tx, results) => {
          const users = results.rows._array;
          console.log(users);
          resolve(users);
        },
        (tx, error) => {
          console.log('Error querying user:', error);
          reject(error);
        }
      );
    });
  });
};

// Add a user by username, password and team
const addUser = async (username: string, password: string, team: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO user (username, password, team) VALUES (?, ?, ?)',
        [username, password, team],
        (tx, results) => {
          console.log('User added successfully');
          resolve(results.insertId);
        },
        (tx, error) => {
          console.log('Error adding user:', error);
          reject(error);
        }
      );
    });
  });
};

// delete a user by ID
const deleteUser = async (id: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM user WHERE id = ?',
        [id],
        () => {
          console.log(`User with id ${id} deleted successfully`);
          resolve(); // Resolve when the user is deleted
        },
        (tx, error) => {
          console.log(`Error deleting user with id ${id}:`, error);
          reject(error); // Reject on error
        }
      );
    });
  });
};

// Run createTable to ensure the table is created on startup
createUserTable()
  .then(() => listAllUsers())
  .catch(err => console.error(err));

export { createUserTable, listAllUsers, addUser, deleteUser };
