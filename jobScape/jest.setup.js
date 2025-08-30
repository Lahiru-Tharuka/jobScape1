import '@testing-library/jest-dom';

process.env.JWT_SECRET_KEY = 'testsecret';
process.env.JWT_EXPIRE = '1d';
process.env.COOKIE_EXPIRE = '5';
process.env.SMTP_HOST = 'smtp.test';
process.env.SMTP_SERVICE = 'gmail';
process.env.SMTP_PORT = '465';
process.env.SMTP_MAIL = 'test@test.com';
process.env.SMTP_PASSWORD = 'password';
process.env.ML_SERVICE_URL = 'http://localhost:8001';
