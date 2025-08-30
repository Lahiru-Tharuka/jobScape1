import { isAuthenticated, isAuthorized } from '../../backend/middlewares/auth.js';
import { catchAsyncErrors } from '../../backend/middlewares/catchAsyncErrors.js';
import { errorMiddleware } from '../../backend/middlewares/error.js';
import ErrorHandler from '../../backend/middlewares/error.js';
import jwt from 'jsonwebtoken';
import { User } from '../../backend/models/userSchema.js';

jest.mock('jsonwebtoken', () => ({ verify: jest.fn() }));
jest.mock('../../backend/models/userSchema.js', () => ({ User: { findById: jest.fn() } }));

describe('isAuthenticated', () => {
  it('throws error if token missing', async () => {
    const req = { cookies: {} };
    const next = jest.fn();
    await isAuthenticated(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('attaches user when token valid', async () => {
    const req = { cookies: { token: 'abc' } };
    const next = jest.fn();
    jwt.verify.mockReturnValue({ id: '1' });
    User.findById.mockResolvedValue({ name: 'Test' });
    await isAuthenticated(req, {}, next);
    expect(req.user).toEqual({ name: 'Test' });
    expect(next).toHaveBeenCalled();
  });
});

describe('isAuthorized', () => {
  it('blocks unauthorized role', () => {
    const middleware = isAuthorized('Admin');
    const req = { user: { role: 'User' } };
    const next = jest.fn();
    middleware(req, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(ErrorHandler));
  });

  it('allows authorized role', () => {
    const middleware = isAuthorized('Admin');
    const req = { user: { role: 'Admin' } };
    const next = jest.fn();
    middleware(req, {}, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('catchAsyncErrors', () => {
  it('catches errors and passes to next', async () => {
    const fn = catchAsyncErrors(async () => { throw new Error('fail'); });
    const next = jest.fn();
    await fn({}, {}, next);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('errorMiddleware', () => {
  it('handles cast error', () => {
    const err = { name: 'CastError', path: 'id' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    errorMiddleware(err, {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('handles default error', () => {
    const err = { message: 'oops' };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    errorMiddleware(err, {}, res, () => {});
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  });
});
