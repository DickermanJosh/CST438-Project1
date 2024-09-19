import * as SQLite from 'expo-sqlite/legacy';
import { db } from './db';

const createPokemonTable = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS pokemon (pokemonID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, picture TEXT); ',
          [],
          () => {
            resolve("Pokemon table created succesfully");
          },
          (tx, error) => {
            reject(error); // Reject the promise on error
            return false;
          }
        );
      });
    });
};

const listAllPokemon = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM pokemon',
          [],
          (tx, results) => {
            const users = results.rows._array;
            console.log(users);
            resolve(users);
          },
          (tx, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
};

const addPokemon = async (name: string, picture: string) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO pokemon (name, picture) VALUES (?, ?)',
          [name, picture],
          (tx, results) => {
            resolve(results.insertId);
          },
          (tx, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
};

const deletePokemonByID = async (id: number) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM pokemon WHERE id = ?',
          [id],
          () => {
            resolve(`Pokemon with id ${id} has been deleted`); 
          },
          (tx, error) => {
            console.log(`Error deleting pokemon with id ${id}`, error);
            reject(error); // Reject on error
            return false;
          }
        );
      });
    });
};

const deletePokemonByName = async (name: string) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM pokemon WHERE LOWER(name) = ?',
          [name],
          () => {
            resolve(`Pokemon with name ${name} has been deleted`); 
          },
          (tx, error) => {
            console.log(`Error deleting pokemon with name ${name}`, error);
            reject(error); // Reject on error
            return false;
          }
        );
      });
    });
};

const getPokemonListByUserId = async (userId: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT pokemonID FROM UsersToPokemon WHERE UserID = ?',
        [userId],
        (tx, results) => {
          const pokemonIds = [];
          for (let i = 0; i < results.rows.length; i++) {
            pokemonIds.push(results.rows.item(i).pokemonID);
          }
          resolve(pokemonIds);
        },
        (tx, error) => {
          console.log(`Error finding Pokémon for user ID: ${userId}`, error);
          reject(error);
        }
      );
    });
  });
};

const getPokemonById = async (id: number) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM pokemon WHERE pokemonID = ?',
        [id],
        (tx, results) => {
          if (results.rows.length > 0) {
            resolve(results.rows.item(0));
          } else {
            resolve(null);
          }
        },
        (tx, error) => {
          console.log(`Error finding Pokémon with id: ${id}`, error);
          reject(error);
        }
      );
    });
  });
};
createPokemonTable()
  .then(() => listAllPokemon())
  .catch(err => console.error(err));

export { getPokemonListByUserId, getPokemonById, createPokemonTable, listAllPokemon, addPokemon, deletePokemonByID, deletePokemonByName };
