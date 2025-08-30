import express from 'express';
import request from 'supertest';
import recommendationRouter from '../../backend/routes/recommendationRouter.js';
import axios from 'axios';
import { errorMiddleware } from '../../backend/middlewares/error.js';

jest.mock('axios');
jest.mock('../../backend/middlewares/auth.js', () => ({
  isAuthenticated: (req, res, next) => {
    req.user = { _id: '1' };
    next();
  }
}));

const app = express();
app.use(express.json());
app.use('/api/v1', recommendationRouter);
app.use(errorMiddleware);

describe('recommendation routes', () => {
  it('returns 200 for recommend', async () => {
    axios.post.mockResolvedValue({ data: { recommendations: [] } });
    const res = await request(app).post('/api/v1/recommend').send({ resume: 'abc' });
    expect(res.status).toBe(200);
  });

  it('returns error for failing suggestSkills', async () => {
    axios.post.mockRejectedValue(new Error('fail'));
    const res = await request(app)
      .post('/api/v1/suggestSkills')
      .send({ resume: 'abc', category: 'software' });
    expect(res.status).toBe(500);
  });
});
