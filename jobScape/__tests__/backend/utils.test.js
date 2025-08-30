import { sendToken } from '../../backend/utils/jwtToken.js';
import { sendEmail } from '../../backend/utils/sendEmail.js';
import nodeMailer from 'nodemailer';

jest.mock('nodemailer');

describe('sendToken', () => {
  it('sets cookie and returns token', () => {
    const user = { getJWTToken: () => 'abc' };
    const res = {
      status: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    sendToken(user, 200, res, 'ok');
    expect(res.cookie).toHaveBeenCalledWith('token', 'abc', expect.any(Object));
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'abc', message: 'ok' }));
  });
});

describe('sendEmail', () => {
  it('uses nodemailer transport', async () => {
    const send = jest.fn().mockResolvedValue(true);
    nodeMailer.createTransport.mockReturnValue({ sendMail: send });
    await sendEmail({ email: 'a@a.com', subject: 'sub', message: 'msg' });
    expect(nodeMailer.createTransport).toHaveBeenCalled();
    expect(send).toHaveBeenCalledWith(expect.objectContaining({ to: 'a@a.com' }));
  });
});
