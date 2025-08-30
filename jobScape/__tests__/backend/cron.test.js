import { newsLetterCron } from '../../backend/automation/newsLetterCron.js';
import cron from 'node-cron';
import { Job } from '../../backend/models/jobSchema.js';
import { User } from '../../backend/models/userSchema.js';
import { sendEmail } from '../../backend/utils/sendEmail.js';

jest.mock('node-cron', () => ({ schedule: jest.fn((expr, fn) => fn()) }));
jest.mock('../../backend/models/jobSchema.js', () => ({ Job: { find: jest.fn() } }));
jest.mock('../../backend/models/userSchema.js', () => ({ User: { find: jest.fn() } }));
jest.mock('../../backend/utils/sendEmail.js', () => ({ sendEmail: jest.fn() }));

describe('newsLetterCron', () => {
  it('sends emails to matching users and marks job', async () => {
    const job = { jobNiche:'Tech', title:'Dev', companyName:'X', location:'NY', salary:'100', newsLettersSent:false, save: jest.fn() };
    Job.find.mockResolvedValue([job]);
    User.find.mockResolvedValue([{ name:'User', email:'u@test.com' }]);
    newsLetterCron();
    await Promise.resolve();
    expect(sendEmail).toHaveBeenCalledWith(expect.objectContaining({ email:'u@test.com' }));
    expect(job.save).toHaveBeenCalled();
  });
});
