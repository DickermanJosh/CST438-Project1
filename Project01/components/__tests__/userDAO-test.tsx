import { createUserTable, addUser, listAllUsers, deleteUser } from '../../app/userDAO';
import * as SQLite from 'expo-sqlite/legacy';

// Mocking the SQLite database
jest.mock('expo-sqlite', () => ({
  openDatabase: jest.fn(() => ({
    transaction: jest.fn((callback) => {
      const tx = {
        executeSql: jest.fn((sql, params, success, error) => {
          if (sql.includes('CREATE TABLE')) {
            success(tx, { rowsAffected: 1 });
          } else if (sql.includes('INSERT INTO user')) {
            success(tx, { insertId: 1 });
          } else if (sql.includes('SELECT * FROM user')) {
            success(tx, { rows: { _array: [{ id: 1, username: 'testuser', password: 'password', team: 'team1' }] } });
          } else if (sql.includes('DELETE FROM user')) {
            success(tx, { rowsAffected: 1 });
          } else {
            error(tx, new Error('Unknown SQL query'));
          }
        }),
      };
      callback(tx);
    }),
  })),
}));

describe('UserDAO Tests', () => {
  beforeAll(async () => {
    // Create the user table before running tests
    await createUserTable();
  });

  it('should create the user table successfully', async () => {
    await createUserTable();
    expect(SQLite.openDatabase).toHaveBeenCalled();
  });

  it('should add a user to the database', async () => {
    const insertId = await addUser('testuser', 'password', 'team1');
    expect(insertId).toBe(1);
  });

  it('should list all users', async () => {
    const users = await listAllUsers();
    expect(users.length).toBeGreaterThan(0); // Expect at least one user to be returned because of previous addUser test
    expect(users).toEqual([
      {
        id: expect.any(Number),
        username: 'testuser',
        password: 'password',
        team: 'team1',
      },
    ]);
  });

  it('should delete a user from the database', async () => {
    await deleteUser(1); // Deleting user with id 1
    expect(SQLite.openDatabase().transaction).toHaveBeenCalled();
  });
});
