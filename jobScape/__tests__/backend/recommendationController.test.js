import { recommendJobs, suggestSkills } from '../../backend/controllers/recommendationController.js';
import ErrorHandler from '../../backend/middlewares/error.js';
import axios from 'axios';

jest.mock('axios');

describe('recommendationController', () => {
  it('errors when resume missing', async () => {
    const req = { body: {} };
    const next = jest.fn();
    await recommendJobs(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('returns recommendations', async () => {
    axios.post.mockResolvedValue({ data: { recommendations: [] } });
    const req = { body: { resume: 'test' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await recommendJobs(req, res, () => {});
    expect(res.status).toHaveBeenCalledWith(200);
    expect(axios.post).toHaveBeenCalled();
  });

  it('suggests skills', async () => {
    axios.post.mockResolvedValue({ data: { missing_skills: ['python'] } });
    const req = { body: { resume: 'hi', category: 'software' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await suggestSkills(req, res, () => {});
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });
});
