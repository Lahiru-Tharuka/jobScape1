import { postJob } from '../../backend/controllers/jobController.js';
import ErrorHandler from '../../backend/middlewares/error.js';
import { Job } from '../../backend/models/jobSchema.js';

jest.mock('../../backend/models/jobSchema.js', () => ({ Job: { create: jest.fn(), find: jest.fn(), findById: jest.fn() } }));

describe('postJob', () => {
  it('errors if required fields missing', async () => {
    const req = { body: {}, user: { _id: '1' } };
    const next = jest.fn();
    await postJob(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('errors if website fields mismatch', async () => {
    const req = { body: { title:'t', jobType:'full', location:'loc', companyName:'comp', introduction:'intro', responsibilities:'res', qualifications:'qual', salary:'100', jobNiche:'tech', personalWebsiteTitle:'site' }, user:{ _id:'1' } };
    const next = jest.fn();
    await postJob(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('creates job successfully', async () => {
    Job.create.mockResolvedValue({ title:'t' });
    const req = { body: { title:'t', jobType:'full', location:'loc', companyName:'comp', introduction:'intro', responsibilities:'res', qualifications:'qual', salary:'100', jobNiche:'tech', personalWebsiteTitle:'site', personalWebsiteUrl:'url' }, user:{ _id:'1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    await postJob(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});
