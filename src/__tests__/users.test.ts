import { deleteOne, getAll, getOne, updateOne, upsertOne } from '../services/users';

const mockUser1 = { name: 'Antonio', email: 'antonio@email.com' };
const mockUser2 = { name: 'Bianca', email: 'bianca@email.com' };
const mockUser3 = { name: 'Cecilia', email: 'cecilia@email.com' };

describe('users API', () => {
  beforeAll(async () => {
    await expect(upsertOne(mockUser1.name, mockUser1.email)).resolves.toHaveProperty('id', 1);
    await expect(upsertOne(mockUser2.name, mockUser2.email)).resolves.toHaveProperty('id', 2);
    await expect(upsertOne(mockUser3.name, mockUser3.email)).resolves.toHaveProperty('id', 3);
  });

  it('returns all users', async () => {
    await expect(getAll()).resolves.toHaveLength(3);
  });

  it('returns one user', async () => {
    await expect(getOne(3)).resolves.toHaveProperty('name', 'Cecilia');
  });

  it('creates new user if email doesnt exist', async () => {
    const user = {
      name: 'Danny',
      email: 'danny@email.com'
    };

    await expect(upsertOne(user.name, user.email)).resolves.toHaveProperty('id', 4);
  });

  it('upserts user if email exists', async () => {
    const user = {
      name: 'Danny',
      email: 'danny@email.com'
    };

    await expect(upsertOne(user.name, user.email)).resolves.toHaveProperty('name', 'Danny');
  });

  it('updates existing user', async () => {
    const originalUser = {
      id: 4,
      name: 'Danny',
      email: 'danny@email.com'
    };

    const updatedUser = {
      id: 4,
      name: 'Daniel',
      email: 'danny@new-email.com'
    };

    await expect(updateOne(originalUser.id, updatedUser.name, updatedUser.email))
      .resolves.toHaveProperty('email', 'danny@new-email.com');
  });

  it('deletes existing user', async () => {
    const user = {
      id: 4,
      name: 'Daniel',
      email: 'danny@new-email.com'
    };

    await expect(deleteOne(user.id)).resolves.toHaveProperty('id', 4);
    await expect(getAll()).resolves.toHaveLength(3);
  });
});
