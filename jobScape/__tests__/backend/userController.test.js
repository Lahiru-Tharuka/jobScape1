import { register, login } from '../../backend/controllers/userController.js';
import ErrorHandler from '../../backend/middlewares/error.js';
import { User } from '../../backend/models/userSchema.js';
import { sendToken } from '../../backend/utils/jwtToken.js';

jest.mock('../../backend/models/userSchema.js', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('../../backend/utils/jwtToken.js', () => ({
  sendToken: jest.fn(),
}));

jest.mock('cloudinary', () => ({
  v2: { uploader: { upload: jest.fn() } }
}));

describe('userController register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns error when required fields missing', async () => {
    const req = { body: { email: 'test@test.com' } };
    const next = jest.fn();
    await register(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('returns error when email exists', async () => {
    User.findOne.mockResolvedValue({ _id: '1' });
    const req = { body: { name:'A', email:'test@test.com', phone:1, address:'addr', password:'password123', role:'Employer' } };
    const next = jest.fn();
    await register(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('registers successfully', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ getJWTToken: () => 'token' });
    const req = { body: { name:'A', email:'test@test.com', phone:1, address:'addr', password:'password123', role:'Employer' } };
    const res = { status: jest.fn().mockReturnThis(), cookie: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    await register(req, res, next);
    expect(sendToken).toHaveBeenCalled();
  });
});

describe('userController login', () => {
  beforeEach(() => jest.clearAllMocks());

  it('errors for missing fields', async () => {
    const req = { body: { email: 'a@a.com' } };
    const next = jest.fn();
    await login(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('errors for invalid email', async () => {
    User.findOne.mockResolvedValue(null);
    const req = { body: { role:'Employer', email:'a@a.com', password:'pass1234' } };
    const next = jest.fn();
    await login(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('errors for wrong password', async () => {
    User.findOne.mockResolvedValue({ comparePassword: jest.fn().mockResolvedValue(false), role:'Employer' });
    const req = { body: { role:'Employer', email:'a@a.com', password:'pass1234' } };
    const next = jest.fn();
    await login(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('errors for role mismatch', async () => {
    User.findOne.mockResolvedValue({ comparePassword: jest.fn().mockResolvedValue(true), role:'Job Seeker' });
    const req = { body: { role:'Employer', email:'a@a.com', password:'pass1234' } };
    const next = jest.fn();
    await login(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('logs in successfully', async () => {
    User.findOne.mockResolvedValue({ comparePassword: jest.fn().mockResolvedValue(true), role:'Employer' });
    const req = { body: { role:'Employer', email:'a@a.com', password:'pass1234' } };
    const res = { status: jest.fn().mockReturnThis(), cookie: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    await login(req, res, next);
    expect(sendToken).toHaveBeenCalled();
  });
});
