<<<<<<< HEAD
export {}
=======
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import { HTTP_STATUS } from '../../utils/constants.js';

/**
 * Signs a JWT for a given user document.
 * Payload intentionally minimal (id + role) — authMiddleware
 * relies on exactly this shape when populating req.user.
 */
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });
};

/**
 * Registers a new user.
 * NOTE: Public self-registration with an arbitrary role is a
 * hackathon-scope simplification. In production this would typically
 * be restricted to an admin-only "create user" flow.
 */
export const registerUser = async ({ name, email, password, role }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const error = new Error('A user with this email already exists');
    error.statusCode = HTTP_STATUS.CONFLICT;
    throw error;
  }

  const user = await User.create({ name, email, password, role });

  const token = generateToken(user);

  return { user, token };
};

/**
 * Authenticates a user by email/password and returns a signed JWT.
 * Deliberately uses a generic "Invalid email or password" message for
 * both "user not found" and "wrong password" cases, to avoid leaking
 * which emails are registered.
 */
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error('This account has been deactivated');
    error.statusCode = HTTP_STATUS.FORBIDDEN;
    throw error;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = HTTP_STATUS.UNAUTHORIZED;
    throw error;
  }

  const token = generateToken(user);

  return { user, token };
};

/**
 * Fetches the currently authenticated user's profile.
 * Used by a "GET /auth/me" style route, given req.user.id
 * populated by authMiddleware.
 */
export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = HTTP_STATUS.NOT_FOUND;
    throw error;
  }

  return user;
};

export default {
  registerUser,
  loginUser,
  getCurrentUser,
};
>>>>>>> origin/main
