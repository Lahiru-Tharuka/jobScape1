import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from '../../backend/models/userSchema.js';

describe('User model', () => {
  let mongo;
  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    await mongoose.connect(mongo.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
  });

  it('hashes password and compares', async () => {
    const user = await User.create({
      name:'Test',
      email:'t@t.com',
      phone:1,
      address:'addr',
      password:'password123',
      role:'Employer'
    });
    expect(user.password).not.toBe('password123');
    const match = await user.comparePassword('password123');
    expect(match).toBe(true);
  });

  it('generates jwt token', () => {
    const user = new User({
      name:'Test', email:'t2@t.com', phone:1, address:'addr', password:'password123', role:'Employer'
    });
    const token = user.getJWTToken();
    expect(typeof token).toBe('string');
  });
});
