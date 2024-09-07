import { db, createUserTable, listAllUsers } from '../../app/db';

// Open a mock DB for testing SQL transactions
jest.mock('expo-sqlite', () => ({
  openDatabase: jest.fn(() => ({
    transaction: jest.fn((callback) => {
      const tx = {
        executeSql: jest.fn((sql, params, success, error) => {
          if (sql.includes('CREATE TABLE')) {
            success(tx, { rowsAffected: 1 });
          } else if (sql.includes('SELECT')) {
            success(tx, { rows: { _array: [{ id: 1, username: 'testuser', password: 'password', team: 'team1' }] } });
          } else {
            error(tx, new Error('Unknown SQL query'));
          }
        }),
      };
      callback(tx);
    }),
  })),
}));

describe('Database Tests', () => {
  it('should create the user table successfully', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    // Ensure that createUserTable waits for the transaction to complete
    await createUserTable();

    expect(consoleSpy).toHaveBeenCalledWith('Table created successfully');
  });

  it('should list all users', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    // Ensure that listAllUsers waits for the transaction to complete
    await listAllUsers();

    expect(consoleSpy).toHaveBeenCalledWith({
      id: 1,
      username: 'testuser',
      password: 'password',
      team: 'team1',
    });
  });
});
