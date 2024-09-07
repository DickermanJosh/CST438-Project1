import * as SQLite from 'expo-sqlite/legacy';

// Test for database connection by running a SELECT query
describe('SQLite Database Connection', () => {
  const db = SQLite.openDatabase('test.db');

  it('should run a query to verify the connection to the db', (done) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT 1;',
        [],
        (_, result) => {
          expect(result).toBeDefined();
          done();
        },
        (_, error) => {
          done.fail(new Error(`DB query failed: ${error.message}`));
        }
      );
    });
  });
});
