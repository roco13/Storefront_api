import { User, UserStore } from '../user';
import bcrypt from 'bcrypt';

const store = new UserStore();

const pepper = process.env.BCRYPT_PASSWORD;

describe('User Model', () => {
  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should create a new user', async () => {
    const testUser: User = {
      id: 2,
      username: 'usertest2',
      password_digest: '123'
    };
    const result = await store.create(testUser);
    expect(result).toBeDefined();
    expect(result.username).toEqual(testUser.username);
    const match = await bcrypt.compare(
      testUser.password_digest + pepper,
      result.password_digest
    );
    expect(match).toBe(true);
  });
});
