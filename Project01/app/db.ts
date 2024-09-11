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

// Run createTable to ensure the table is created
createUserTable();
listAllUsers();

export { db };
