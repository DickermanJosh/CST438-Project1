import * as SQLite from 'expo-sqlite/legacy';

// Open the SQLite database or create it if it doesn't exist
const db = SQLite.openDatabase('pokemon.db');

// TODO: DURING CLEAN UP REMOVE THESE METHODS AND REFER TO THE USERDAO INSTEAD
// Function to create the 'user' table if it doesn't exist
const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, team TEXT)',
      [],
      () => console.log('Table created successfully'),
      (tx, error) => console.log('Error creating table', error)      
    );
  });
};


const listAllUsers = () => {
	db.transaction(tx => {
		tx.executeSql(
			'SELECT * FROM user',
			[],
			async (tx, results) => {
				results.rows["_array"].forEach(function(result) {
				  console.log(result);
				});				
			},
			(tx, error) => {
	          console.log('Error querying user:', error);
	        }
		);
	});
};

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
            const pokemon = results.rows._array;
            console.log(pokemon);
            resolve(pokemon);
          },
          (tx, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
};

const createPokemonToUsersTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS UsersToPokemon (userID INTEGER, pokemonID INTEGER, FOREIGN KEY (userID) REFERENCES user(userID), FOREIGN KEY (pokemonID) REFERENCES pokemon(pokemonID));',
        [],
        () => {
          resolve("Pokemon to users table created succesfully");
        },
        (tx, error) => {
          reject(error); // Reject the promise on error
          return false;
        }
      );
    });
  });
};

const listAllUsersToPokemon = async () => {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM UsersToPokemon',
            [],
            (tx, results) => {
              const usersToPokemon = results.rows._array;
              console.log(usersToPokemon);
              resolve(usersToPokemon);
            },
            (tx, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
  };

const deleteAllUsersToPokemon = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE * FROM UsersToPokemon',
          [],
          (tx, results) => {
            const usersToPokemon = results.rows._array;
            // console.log(usersToPokemon);
            resolve(usersToPokemon);
          },
          (tx, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
};

const deletePokemon = async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE * FROM pokemon',
          [],
          (tx, results) => {
            const pokemon = results.rows._array;
            // console.log(usersToPokemon);
            resolve(pokemon);
          },
          (tx, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
};

// Run createTable to ensure the table is created
createUserTable();
listAllUsers();
createPokemonTable();
listAllPokemon();
createPokemonToUsersTable();
listAllUsersToPokemon();
// deleteAllUsersToPokemon(); did not work 
// deletePokemon(); did not work

export { db };