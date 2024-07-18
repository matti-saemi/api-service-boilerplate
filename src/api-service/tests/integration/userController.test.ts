jest.setTimeout(60000); // 60 seconds timeout

import request from 'supertest';
import app from '../../src/server';
import mongoose from 'mongoose';
import UserModel from '../../src/models/user';

describe('User API', () => {
  let server: ReturnType<typeof app.listen>;
  let port: number;

  beforeAll(async () => {
    port = Math.floor(Math.random() * 40000) + 10000;
    server = app.listen(port);
    try {
      await mongoose.connect('mongodb://localhost:27017/test');
      console.log('MongoDB Connected');
    } catch (error) {
      console.error('Failed to connect to MongoDB', error);
      process.exit(1); // Ensure this doesn't exit the process in tests
    }
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) { // 1 means connected
      await mongoose.connection.db.dropDatabase();
      await mongoose.disconnect();
    }
    server.close();
  });

  it('should return user data for a valid user ID', async () => {
    const user = new UserModel({ id: 1, email: 'test@example.com', password: 'password' });
    await user.save();

    const response = await request(app).get(`/auth/users/1`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  it('should return 404 for an invalid user ID', async () => {
    const response = await request(app).get(`/auth/users/999`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('status', 404);
    expect(response.body).toHaveProperty('message', 'User not found');
  });
});
