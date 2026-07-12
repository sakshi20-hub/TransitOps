export {}
import dotenv from 'dotenv';

dotenv.config();

const REQUIRED_ENV_VARS = ['PORT', 'MONGO_URI', 'JWT_SECRET'];

const validateEnv = () => {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}. ` +
        'Check your .env file against .env.example.'
    );
  }
};

validateEnv();

const env = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || '*',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
  IS_PRODUCTION: (process.env.NODE_ENV || 'development') === 'production',
});

export default env;